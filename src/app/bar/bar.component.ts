import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss']
})
export class BarComponent implements OnInit {
  private data = [
    {"Framework": "Vue", "Stars": "166443", "Released": "2014"},
    {"Framework": "React", "Stars": "150793", "Released": "2013"},
    {"Framework": "Angular", "Stars": "62342", "Released": "2016"},
    {"Framework": "Backbone", "Stars": "27647", "Released": "2010"},
    {"Framework": "Ember", "Stars": "21471", "Released": "2011"},
  ];

  private svg: any;
  private margin = { top: 20, right: 20, bottom: 30, left: 50 };
  private width = 750;
  private height = 400;

  public colors = d3.schemeYlGn[this.data.length];

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
      .call(d3.axisBottom(x));

    const axisY = this.svg.append('g')
      .attr('transform', `translate(${this.margin.left}, 0)`)
      .call(d3.axisLeft(y));

    const bars = this.svg
      .selectAll('rect')
      .data(data)
      .join(
        (enter: any) => enter
          .append('g')
          .append('rect')
          .attr('id', (d: any, i: any) => `bar-${i}`)
          .attr('x', (d: any) => x(d.Framework))
          .attr('y', (d: any) => y(Number(d.Stars)))
          .attr('rx', 4)
          .attr('ry', 4)
          .attr('width', x.bandwidth())
          .attr('height', (d: any) => this.height - this.margin.bottom - y(Number(d.Stars)))
          .attr('stroke', '#000')
          .attr('stroke-width', 0.5)
          .attr('fill', (d: any, i: any) => this.colors[i]),
        (update: any) => update
          .append('g')
          .append('rect')
          .attr('id', (d: any, i: any) => `bar-${i}`)
          .attr('x', (d: any) => x(d.Framework))
          .attr('y', (d: any) => y(parseInt(d.Stars)))
          .attr('width', x.bandwidth())
          .attr('height', (d: any) => this.height - this.margin.bottom - y(Number(d.Stars)))
          .attr('fill', (d: any, i: any) => this.colors[i]),
        (exit: any) => exit.remove()
      );
  }

  constructor() {}

  ngOnInit(): void {
    this.createSvg();
    this.drawBars(this.data);
    this.mouseEvent(this.data);
  }

  public mouseEvent(data: any): void {
    const { width, height, margin } = this;
    const y = d3.scaleLinear()
      .domain([0, d3.max(data, (d: any) => Number(d.Stars))] as [number, number])
      .range([this.height - this.margin.bottom, this.margin.top]);

    d3.selectAll('rect')
      .on('mouseenter', function(event: any) {
        d3.select(this)
          .style('opacity', 0.8)
          .style('cursor', 'pointer')
          .style('stroke', 'black')
      })
      .on('mouseleave', function() {
        d3.select(this)
          .style('opacity', 1)
          .style('cursor', 'default')
      })
      .on('click', function(event: any) {
        d3.select(this)
          .transition()
          .duration(150)
          .attr('height', (d: any) => height - margin.bottom - y(Number(d.Stars)) - 5)
          .attr('y', (d: any) => y(Number(d.Stars)) - 5)
          .transition()
          .duration(150)
          .attr('height', (d: any) => height - margin.bottom - y(Number(d.Stars)))
          .attr('y', (d: any) => y(Number(d.Stars)));
        
      })
  }
}
