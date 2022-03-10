import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-text-elements',
  templateUrl: './text-elements.component.html',
  styleUrls: ['./text-elements.component.scss']
})
export class TextElementsComponent implements OnInit {
  private svg: any;
  private width = 750;
  private height = 400;
  private margin = { top: 40, bottom: 40, left: 40, rigth: 40 };

  private createSvg(): void {
    this.svg = d3.select('#text')
      .append('svg')
      .style('background', '#F6F8FA')
      .attr('width', this.width)
      .attr('height', this.height);

    this.svg.append('g')
      .selectAll('circle')
      .data([
        { x: this.margin.left, y: this.height / 2 },
        { x: this.width / 2, y: this.margin.top },
        { x: this.width - this.margin.rigth, y: this.height / 2 },
        { x: this.width / 2, y: this.height - this.margin.bottom }
      ])
      .join(
        (enter: any) => enter.append('circle'),
        (update: any) => update,
        (exit: any) => exit.remove()
      )
      .attr('cx', (d: any) => d.x)
      .attr('cy', (d: any) => d.y)
      .attr('r', 10)
      .attr('fill', 'orange');

    this.svg
      .append('g')
      .append('text')
      .attr('x', this.width / 2)
      .attr('y', this.height / 2)
      .text('Hello D3.JS')
      .attr('textLength', 200)
      .style('font-size', 36)
      .style('font-family', 'sans-serif')
      .style('font-style', 'italic')
      .style('font-weight', 'bold')  // como no CSS pode ser numeral ou str
      .attr('alignment-baseline', 'middle')
      .attr('text-anchor', 'middle')
      .attr('stroke', '#f00')
      .attr('stroke-width', 0.5)
      // .attr('letter-spacing', 15)
      .attr('rotate', 0)
  }
  

  constructor() { }

  ngOnInit(): void {
    this.createSvg();

    d3.select('svg')
      .attr('cursor', 'pointer')
      .on('mouseenter', function() {
        d3.select('text')
          .transition()
          .duration(1000)
          .style('font-size', 64)
          .attr('textLength', 400)
          .style('fill', '#f00')
          .attr('stroke', '#000')
          .attr('stroke-width', 2.5)
          // .attr('cursor', 'pointer')
      })
      .on('mouseleave', function() {
        d3.selectAll('text')
          .transition()
          .duration(1000)
          .style('font-size', 32)
          .attr('textLength', 200)
          .style('fill', '#000')
          .attr('stroke', '#f00')
          .attr('stroke-width', 0.5)
          // .attr('cursor', 'pointer')
      })
  }

}
