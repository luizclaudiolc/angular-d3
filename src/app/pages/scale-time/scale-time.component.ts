import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-scale-time',
  templateUrl: './scale-time.component.html',
  styleUrls: ['./scale-time.component.scss']
})
export class ScaleTimeComponent implements OnInit {
  private margin = { top: 20, right: 20, bottom: 20, left: 20 };
  private width = 700;
  private height = 400;

  private draw(): void {
    const svg = d3.select('#time')
      .append('svg')
      .style('background-color', '#cece')
      .attr('width', this.width)
      .attr('height', this.height);

    const ts = d3.scaleTime()
      .domain([new Date(2021, 0, 1), new Date(2021, 11, 31)])
      .range([this.margin.top, this.height - (this.margin.top + this.margin.bottom)]);

    const dates = ts.ticks(d3.timeMonth);
    console.log(dates);

    const dFormat = d3.timeFormat('%A, %d %B %Y');

    svg.selectAll('text')
      .data(dates)
      .enter()
      .append('text')
      .attr('x', 250)
      .attr('y', (d) => ts(d) + this.margin.top)
      .text((d: any) => dFormat(d));
  };

  constructor() { }

  ngOnInit(): void {
    this.draw()
  }

}
