import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-scatter',
  templateUrl: './scatter.component.html',
  styleUrls: ['./scatter.component.scss']
})
export class ScatterComponent implements OnInit {
  private data = [
    {"Framework": "Vue", "Stars": "166443", "Released": "2014"},
    {"Framework": "React", "Stars": "150793", "Released": "2013"},
    {"Framework": "Angular", "Stars": "62342", "Released": "2016"},
    {"Framework": "Backbone", "Stars": "27647", "Released": "2010"},
    {"Framework": "Ember", "Stars": "21471", "Released": "2011"},
  ];

  private svg: any;
  private margin = 50;
  private width = 750;
  private height = 400;
  public colors = [
    '#f00',
    '#0f0',
    '#00f',
    '#ff0',
    '#0ff',
    '#f0f',
    '#000',
  ];

  private createSvg(): void {
    this.svg = d3.select('#scatter')
      .append('svg')
      .attr('width', this.width + (this.margin * 2))
      .attr('height', this.height + (this.margin * 2))
      .append('g')
      .attr('transform', `translate(${this.margin}, ${this.margin})`);
  }

  private drawChart(): void {
    // add eixo X
    const x = d3.scaleLinear()
    .domain([2008, 2018])
    .range([0, this.width]);

    this.svg.append('g')
      .attr('transform', `translate(0, ${this.height})`)
      .call(d3.axisBottom(x).tickFormat(d3.format('d')));

    // add eixo Y
    const y = d3.scaleLinear()
      .domain([0, 200000])
      .range([this.height, 0]);

    this.svg.append('g')
      .call(d3.axisLeft(y));

    // add dots
    const dots = this.svg.append('g');
    dots.selectAll('dot')
      .data(this.data)
      .enter()
      .append('circle')
      .attr('cx', (d: any) => x(d.Released))
      .attr('cy', (d: any) => y(d.Stars))
      .attr('r', 30)
      .style('fill', (d: any, i: number) => this.colors[i]);

    // add labels
    dots.selectAll('text')
      .data(this.data)
      .enter()
      .append('text')
      .text((d: any) => d.Framework)
      .attr('x', (d: any) => x(d.Released) - 25)
      .attr('y', (d: any) => y(d.Stars) + 5)
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
        .attr('r', 40)
        .style('opacity', 0.4)
        .style('cursor', 'pointer');
      })
      .on('mouseout', function() {
        d3.select(this)
        .transition()
        .duration(150)
        .attr('r', 30)
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
