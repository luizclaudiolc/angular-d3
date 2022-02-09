import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-scales',
  templateUrl: './scales.component.html',
  styleUrls: ['./scales.component.scss']
})
export class ScalesComponent implements OnInit {
  margins = { top: 20, right: 50, bottom: 20, left: 30 };
  width = 750;
  height = 400;
  svg: any
  data = d3.range(0, 121, 5);

  

  constructor() { }

  ngOnInit(): void {
    this.drawSvg();
    this.update();
    this.mouseEvent();
  }

  drawSvg(): void {
    this.svg = d3.select('#scales')
      .append('svg')
      // .style('background-color', '#f5f5')
      .attr('width', this.width)
      .attr('height', this.height)
      .attr('id', 'svg-scales');

    d3.select('svg#svg-scales').append('g').attr('id', 'g-circles');
    d3.select('svg#svg-scales').append('g').attr('id', 'g-text');
    d3.select('svg#svg-scales').append('g').attr('id', 'g-axis');
  }

  update(): void {
    if (!this.data.length) {
      console.log('No data');
      return;
    }

    // *** updade SVG ***
    d3.select('#svg-scales')
      .attr('width', this.width)
      .attr('height', this.height);

    // *** scale *** //
    const scale = d3.scaleLinear()
      .domain([0, d3.max(this.data, d => d)] as [number, number])
      .range([this.margins.left, this.width - this.margins.right]);

    // *** axis *** //
    const axis = d3.axisBottom(scale)
      .tickSize(-this.height + this.margins.top + this.margins.bottom)
      .tickPadding(5)
      .tickSizeOuter(0);

    d3.select('#g-axis')
      .transition()
      .duration(1000)
      .attr('transform', `translate(0, ${this.height - this.margins.bottom})`)
      .call(axis as any);

    d3.select('#g-axis')
      .selectAll('line')
      .attr('stroke-dasharray', '2,2')
      .attr('stroke-opacity', 0.2);


    // *** circles *** //
    d3.select('#g-circles')
      .selectAll('circle')
      .data(this.data)
      .join(
        (enter) => enter.append('circle'),
        (update) => update,
        (exit) => exit.remove()
      )
      .attr('cx', (d) => scale(d))
      .attr('cy', (d: any, i: number) => i % 2 === 0 ? this.height / 2 : this.height / 2 + 20)
      .attr('r', 0)
      .transition()
      .duration(250)
      .delay((d, i) => i * 50)
      .attr('r', (d: any, i: number) => i + 2)
      .attr('opacity', 0.6)
      .attr('fill', (d: any, i: number) => i % 2 === 0 ? '#f00' : '#0f0')
      .attr('stroke', '#000')

    // *** text *** //
    d3.select('#g-text')
      .selectAll('text')
      .data(this.data)
      .join(
        (enter) => enter.append('text'),
        (update) => update,
        (exit) => exit.remove()
      )
      .attr('x', (d) => scale(d))
      .attr('y', (d: any, i: number) => i % 2 === 0 ? this.height / 2 : this.height / 2 + 20)
      .attr('font-size', '10px')
      .attr('fill', '#000')
      .attr('text-anchor', 'middle')
      .attr('alignment-baseline', 'middle')
      .transition()
      .duration(250)
      .delay((d, i) => i * 60)
      .text((d) => d)
      .style('pointer-events', 'none');
  };

  mouseEvent(): void {
    const mouseEnter = (event: any) => {
      console.log('mouseEnter', event);
    }

    const mouseLeave = (event: any) => {
      console.log('mouseLeave', event);
    }

    /* const mouseMove = (event: any) => {
      d3.select(event.target)
        .attr('cx', (d: any, i: number) => event.layerX)
        .attr('cy', (d: any, i: number) => event.layerY);
    } */

    d3.selectAll('circle')
      .on('mouseenter', mouseEnter)
      .on('mouseleave', mouseLeave)
      // .on('mousemove', mouseMove);
  }

}
