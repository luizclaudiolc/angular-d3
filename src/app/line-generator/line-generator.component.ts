import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-line-generator',
  templateUrl: './line-generator.component.html',
  styleUrls: ['./line-generator.component.scss']
})
export class LineGeneratorComponent implements OnInit {
  private svg: any;
  private margin = {top: 20, right: 20, bottom: 20, left: 20};
  private width = 750;
  private height = 400;
  private dataset = [
    [100, 200],
    [150, 90],
    [200, 150],
    [250, 300],
    [310, 190],
    [410, 120],
    [475, 250],
    [550, 350],
    [600, 50],
  ];

  private draw(): void {
    const svg = this.svg = d3.select('#line')
      .append('svg')
      .style('background-color', '#cece')
      .attr('width', this.width)
      .attr('height', this.height)
      .append('g')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);

    const txt = svg.append('text')
      .attr('x', 20)
      .attr('y', 20)
      .text('Curves in D3.js')

    const points = this.svg.append('g')
      .selectAll('circle')
      .data(this.dataset)
      .enter()
      .append('circle')
      .attr('cx', (d: any) => d[0])
      .attr('cy', (d: any) => d[1])
      .attr('r', 5);

    const line = d3.line();
    // line.x((d: any) => d[0]);
    // line.y((d: any) => d[1]);

    const path = this.svg.append('path')
      .attr('d', line(this.dataset as any))
      .attr('stroke', '#ff0000')
      .attr('stroke-width', 2)
      .attr('fill', 'none');
    
      const nextCurve = () => {
        ix++;
        const keys = Object.keys(curves);
        const value = Object.values(curves);
        ix = (ix === value.length) ? 0 : ix;
        line.curve(value[ix]);
        svg.select('path').attr('d', line(this.dataset as any));
        svg.select('text').text(keys[ix]);
      }

    const btn = d3.select('#line')
      .append('div')
      .append('button')
      .attr('class', 'btn btn-primary')
      .text('Change dataset')
      .on('click', nextCurve);

    let ix = 0;
    const curves = {
      curveBasis: d3.curveBasis,
      curveBasisClosed: d3.curveBasisClosed,
      curveBasisOpen: d3.curveBasisOpen,
      curveBundle: d3.curveBundle,
      curveCardinal: d3.curveCardinal.tension(.5),
      curveCardinalClosed: d3.curveCardinalClosed,
      curveCardinalOpen: d3.curveCardinalOpen,
      curveCatmullRom: d3.curveCatmullRom,
      curveCatmullRomClosed: d3.curveCatmullRomClosed,
      curveCatmullRomOpen: d3.curveCatmullRomOpen,
      curveLinear: d3.curveLinear,
      curveLinearClosed: d3.curveLinearClosed,
      curveMonotoneX: d3.curveMonotoneX,
      curveMonotoneY: d3.curveMonotoneY,
      curveNatural: d3.curveNatural,
      curveStep: d3.curveStep,
      curveStepAfter: d3.curveStepAfter,
      curveStepBefore: d3.curveStepBefore,
    };
  }

  constructor() { }

  ngOnInit(): void {
    this.draw();
  }

}
