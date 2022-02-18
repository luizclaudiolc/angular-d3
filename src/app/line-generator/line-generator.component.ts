import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { IntrojsService } from '../introjs.service';

@Component({
  selector: 'app-line-generator',
  templateUrl: './line-generator.component.html',
  styleUrls: ['./line-generator.component.scss']
})
export class LineGeneratorComponent implements OnInit {
  svg: any;
  margin = {top: 20, right: 20, bottom: 20, left: 20};
  width = 750;
  height = 400;
  dataset = [
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

  constructor(private introService: IntrojsService) { }

  ngOnInit(): void {
    this.draw();
  }

  draw(): void {
    this.svg = d3.select('#line')
      .append('svg')
      .style('background-color', '#FAFAFA')
      .attr('width', this.width)
      .attr('height', this.height)
      .append('g')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);

    const txt = this.svg.append('text')
      .attr('x', 20)
      .attr('y', 20)
      .attr('id', 'txt')
      .text('Curves in D3.js')

    const line = d3.line();
    // line.x((d: any) => d[0]);
    // line.y((d: any) => d[1]);

    const path = this.svg.append('path')
      .attr('d', line(this.dataset as any))
      .attr('stroke', '#ff0000')
      .attr('stroke-width', 2)
      .attr('fill', 'none');
    
      const points = this.svg.append('g')
      .selectAll('circle')
      .data(this.dataset)
      .enter()
      .append('circle')
      .attr('id', (d: any, i: any) => `point-${i}`)
      .attr('cx', (d: any) => d[0])
      .attr('cy', (d: any) => d[1])
      .attr('r', 5)
      .attr('fill', '#FAFAFA')
      .attr('stroke', '#000')
      .attr('stroke-width', 2);
    
    const nextCurve = () => {
      const curves = Object.entries(curvesObj);
      ix++;
      ix = (ix === curves.length) ? 0 : ix;
      line.curve(curves[ix][1]);
      this.svg.select('path')
      .attr('stroke-dasharray', '1900')
      .attr('stroke-dashoffset', '1000')
      .transition()
      .duration(1000)
      .attr('stroke-dashoffset', 0)
      .attr('d', line(this.dataset as any))
      this.svg.select('text').text(curves[ix][0]);
    }

    const btn = d3.select('#line')
      .append('div')
      .append('button')
      .attr('class', 'btn btn-primary')
      .text('Change dataset')
      .on('click', nextCurve);

    let ix = 0;
    const curvesObj = {
      curveBasis: d3.curveBasis,
      curveBasisClosed: d3.curveBasisClosed,
      curveBasisOpen: d3.curveBasisOpen,
      curveBundle: d3.curveBundle,
      curveCardinal: d3.curveCardinal.tension(0),
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
      curveBumpX: d3.curveBumpX,
      curveBumpY: d3.curveBumpY,
    };

    d3.selectAll('circle')
      .on('mouseenter', (event: any) => {
        d3.select(event.target)
          .attr('r', 10);
      })
      .on('mouseleave', (event: any) => {
        d3.select(event.target)
          .attr('r', 5);
      });
  }

  ngAfterViewInit(): void {
    // this.introService.t1();
  }

}
