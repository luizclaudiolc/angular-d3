import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-scales',
  templateUrl: './scales.component.html',
  styleUrls: ['./scales.component.scss']
})
export class ScalesComponent implements OnInit {
  private margins = { top: 20, right: 20, bottom: 20, left: 20 };
  private width = 750;
  private height = 400;
  private data = d3.range(0, 101, 5);

  private draw(): void {
    const svg = d3.select('#scales')
      .append('svg')
      .style('background-color', '#f5f5')
      .attr('width', this.width)
      .attr('height', this.height)
      .append('g')
      .attr('transform', `translate(${this.margins.left}, ${this.margins.right})`);

    const t = d3.extent(this.data);
    console.log(t)

    const scale = d3.scaleLinear()
      .domain([0, 100])
      .rangeRound([this.margins.left, this.width]);

    svg.selectAll('circle')
      .data(this.data)
      .enter()
      .append('circle')
      .attr('cx', (d) => scale(d))
      .attr('cy', 200)
      .attr('r', 10)
      .attr('opacity', 0.5)

    svg.selectAll('text')
      .data(this.data)
      .enter()
      .append('text')
      .text((d) => d)
      .attr('x', (d) => scale(d))
      .attr('y', 200)
      .attr('font-size', '10px')
      .attr('fill', '#fff')
      .attr('text-anchor', 'middle')
      .attr('alignment-baseline', 'middle')
      .text((d) => d)
      .style('pointer-events', 'none');
  }

  constructor() { }

  ngOnInit(): void {
    this.draw();
    console.log(this.data);
  }

}
