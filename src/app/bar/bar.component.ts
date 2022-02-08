import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss']
})
export class BarComponent implements OnInit {
  private data = [
    {"Framework": "React", "Stars": "150793", "Released": "2013"},
    {"Framework": "Vue", "Stars": "166443", "Released": "2014"},
    {"Framework": "Backbone", "Stars": "27647", "Released": "2010"},
    {"Framework": "Angular", "Stars": "62342", "Released": "2016"},
    {"Framework": "Ember", "Stars": "21471", "Released": "2011"},
    {"Framework": "Meteor", "Stars": "104618", "Released": "2010"},
    {"Framework": "jQuery", "Stars": "82473", "Released": "2011"},
    {"Framework": "Knockout.js", "Stars": "180859", "Released": "2010"},
    {"Framework": "Dojo", "Stars": "160500", "Released": "2009"},
    {"Framework": "Ext JS", "Stars": "102688", "Released": "2009"},
    {"Framework": "D3.js", "Stars": "78000", "Released": "2009"},
    {"Framework": "CoffeeScript", "Stars": "96000", "Released": "2009"},
    {"Framework": "Lodash", "Stars": "45000", "Released": "2009"},
    {"Framework": "Nuxt.js", "Stars": "15500", "Released": "2009"},
  ];

  private svg: any;
  private margin = { top: 20, right: 20, bottom: 30, left: 50 };
  private width = 750;
  private height = 400;

  public colors = d3.scaleOrdinal(d3.schemeTableau10);

  private createSvg(): void {
    this.svg = d3.select('#bar')
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height)
  }

  private drawBars(data: any[]): void {
    const x = d3.scaleBand()
      .range([this.margin.left, this.width - this.margin.right])
      .domain(data.map((s) => s.Framework))
      .padding(0.5);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => Number(d.Stars))] as [number, number])
      .range([this.height - this.margin.bottom, this.margin.top]);

    const axisX = this.svg.append('g')
      .attr('transform', `translate(0, ${this.height - this.margin.bottom})`)
      .transition()
      .duration(1000)
      .call(d3.axisBottom(x));

    const axisY = this.svg.append('g')
      .attr('transform', `translate(${this.margin.left}, 0)`)
      .transition()
      .duration(1000)
      .call(d3.axisLeft(y));

    const bars = this.svg
      .selectAll('rect')
      .data(data)
      .join(
        (enter: any) => enter.append('rect'),
        (update: any) => update,
        (exit: any) => exit.remove()
      )
      .attr('id', (d: any, i: any) => `bar-${i}`)
      .attr('x', (d: any) => x(d.Framework))
      .attr('y', (d: any) => y(Number(d.Stars)))
      // .attr('rx', 2)
      // .attr('ry', 2)
      .attr('width', x.bandwidth())
      .attr('fill', (d: any, i: any) => this.colors(d))
      .transition()
      .ease(d3.easePoly)
      .duration(200)
      .delay((d: any, i: any) => i * 50)
      .attr('height', (d: any) => this.height - this.margin.bottom - y(Number(d.Stars)));
  }

  constructor() {}

  ngOnInit(): void {
    this.createSvg();
    this.drawBars(this.data);
    this.mouseEvent(this.data);
  }

  public mouseEvent(data: any): void {
    const { width, height, colors } = this;
    const y = d3.scaleLinear()
      .domain([0, d3.max(data, (d: any) => Number(d.Stars))] as [number, number])
      .range([this.height - this.margin.bottom, this.margin.top]);

    d3.selectAll('rect')
      .on('mouseenter', function(event: any) {
        d3.select(this)
          .style('opacity', 0.5)
          .style('cursor', 'pointer');
      })
      .on('mouseleave', function() {
        d3.select(this)
          .style('opacity', 1)
          .style('cursor', 'default');
      })
      .on('click', function(event: any) {
        d3.select(this)
          .attr('stroke-width', 16)
          .attr('y', (d: any) => y(Number(d.Stars)) - 8)
          .attr('stroke', (d: any) => colors(d))
          .transition()
          .duration(400)
          .attr('y', (d: any) => y(Number(d.Stars)))
          .attr('stroke-width', 0);

      })
  }
}
