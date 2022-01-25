import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-scatter',
  templateUrl: './scatter.component.html',
  styleUrls: ['./scatter.component.scss']
})
export class ScatterComponent implements OnInit {
  private data = [
    {'Framework': 'Vue', 'Stars': '166443', 'Released': '2014'},
    {'Framework': 'React', 'Stars': '150793', 'Released': '2013'},
    {'Framework': 'Angular', 'Stars': '62342', 'Released': '2016'},
    {'Framework': 'Backbone', 'Stars': '27647', 'Released': '2010'},
    {'Framework': 'Ember', 'Stars': '21471', 'Released': '2011'},
    {'Framework': 'Knockout', 'Stars': '69055', 'Released': '2012'},
    {'Framework': 'Dojo', 'Stars': '18079', 'Released': '2009'},
    {'Framework': 'ExtJS', 'Stars': '130171', 'Released': '2014'},
    {'Framework': 'D3.js', 'Stars': '10865', 'Released': '2015'},
    {'Framework': 'Meteor', 'Stars': '160983', 'Released': '2009'},
    {'Framework': 'Laravel', 'Stars': '102063', 'Released': '2018'},
    {'Framework': 'Redux', 'Stars': '86443', 'Released': '2014'},
    {'Framework': 'Nest', 'Stars': '146443', 'Released': '2011'},
    {'Framework': 'Webpack', 'Stars': '166443', 'Released': '2017'},
  ];

  private svg: any;
  private margin = {top: 40, right: 40, bottom: 30, left: 50};
  private width = 750;
  private height = 400;
  public colors = d3.scaleOrdinal(d3.schemeTableau10);

  private createSvg(): void {
    this.svg = d3.select('#scatter')
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height)
  }

  private drawChart(): void {
    // add eixo X
    const x = d3.scaleLinear()
    .domain([2008, d3.max(this.data, d => Number(d.Released))] as [number, number])
    .range([this.margin.left, this.width - this.margin.right]);

    this.svg.append('g')
      .attr('transform', `translate(0, ${this.height - this.margin.bottom})`)
      .call(d3.axisBottom(x).tickFormat(d3.format('d')));

    // add eixo Y
    const y = d3.scaleLinear()
      .domain(d3.extent(this.data, d => Number(d.Stars)) as [number, number])
      .range([this.height - this.margin.bottom, this.margin.top]);

    this.svg.append('g')
      .attr('transform', `translate(${this.margin.left}, 0)`)
      .call(d3.axisLeft(y));

    // add dots
    const dots = this.svg.append('g');
    dots.selectAll('circle')
      .data(this.data)
      .enter()
      .append('circle')
      .attr('cx', (d: any) => x(d.Released))
      .attr('cy', (d: any) => y(d.Stars))
      .attr('r', 10)
      .style('fill', (d: any, i: number) => this.colors(d.Framework));

    // add labels
    dots.selectAll('text')
      .data(this.data)
      .enter()
      .append('text')
      .text((d: any) => d.Framework)
      .attr('x', (d: any) => x(d.Released))
      .attr('y', (d: any) => y(d.Stars) - 10)
      .attr('text-anchor', 'middle');
  }

  constructor() { }

  ngOnInit(): void {
    this.createSvg();
    this.drawChart();
    this.eventosMouse();
    this.textMarked();
  }

  public eventosMouse(): void {
    d3.selectAll('circle')
      .on('mouseenter', function() {
        d3.select(this)
        .transition()
        .duration(150)
        .attr('r', 15)
        .style('opacity', 0.6)
        .style('cursor', 'pointer');
      })
      .on('mouseout', function() {
        d3.select(this)
        .transition()
        .duration(150)
        .attr('r', 10)
        .style('opacity', 1)
        .style('cursor', 'default');
      });
  }

  public textMarked(): void {
    d3.selectAll('text')
      .on('mousemove', function() {
        d3.select(this)
        .style('fill', '#000')
        .style('cursor', 'pointer');
      })
      .on('mouseout', function() {
        d3.select(this)
        .style('fill', '#000')
        .style('cursor', 'default');
      })
  }
}
