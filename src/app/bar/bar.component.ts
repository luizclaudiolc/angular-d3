import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';


const mouseEvents = (event: any): void => {
  d3.selectAll('rect')
    .on('mousemove', function() {
      d3.select(this)
        .style('opacity', 0.5)
        .style('cursor', 'pointer')
        .style('fill', '#f00')
        .call(EventInText);
    })
    .on('mouseout', function() {
      d3.select(this)
        .style('opacity', 1)
        .style('cursor', 'default')
        .style('fill', '#69b3a2')
        .call(EventInText);
    }
  );
}

const EventInText = (): void => {
  d3.selectAll('text')
    .on('mousemove', function() {
      d3.select(this)
        .style('opacity', 0.5)
        .style('cursor', 'pointer')
        .style('fill', '#f00')
        .style('font-weight', 'bold');
    })
    .on('mouseout', function() {
      d3.select(this)
        .style('opacity', 1)
        .style('cursor', 'default')
        .style('fill', '#000')
        .style('font-weight', 'normal');
    }
  );
}
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
  private margin = 50;
  private width = 750 - (this.margin * 2);
  private height = 400 - (this.margin * 2);

  private createSvg(): void {
    this.svg = d3.select('#bar')
      .append('svg')
      .attr('width', this.width + (this.margin * 2))
      .attr('height', this.height + (this.margin * 2))
      .append('g')
      .attr('transform', 'translate(' + this.margin + ',' + this.margin + ')');
  }

  private drawBars(data: any[]): void {
    const x = d3.scaleBand()
      .range([0, this.width])
      .domain(data.map((s) => s.Framework))
      .padding(0.2);

    this.svg.append('g')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(d3.axisBottom(x))
      .selectAll('text')
      .attr('transform', 'translate(10,0)rotate(0)')
      .style('text-anchor', 'end');

    const y = d3.scaleLinear()
      .domain([0, 200000])
      .range([this.height, 0]);

    this.svg.append('g')
      .call(d3.axisLeft(y));

    this.svg.selectAll('bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (d: any) => x(d.Framework))
      .attr('y', (d: any) => y(d.Stars))
      .attr('width', x.bandwidth())
      .attr('height', (d: any) => this.height - y(d.Stars))
      .attr('fill', '#69b3a2');
  }

  constructor() { }

  ngOnInit(): void {
    this.createSvg();
    this.drawBars(this.data);
    mouseEvents(this.data);
    EventInText();
  }
}
