import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-area-generator',
  templateUrl: './area-generator.component.html',
  styleUrls: ['./area-generator.component.scss']
})
export class AreaGeneratorComponent implements OnInit {
  private svg: any;
  private margin = {top: 20, right: 20, bottom: 30, left: 40};
  private width = 750;
  private height = 450;

  private dataset = [
    [this.margin.left, this.height / 2],
    [this.width / 2, this.margin.top],
    [this.width - this.margin.right, this.height / 2],
    [this.width / 2, this.height - this.margin.bottom],
    [this.margin.left, this.height / 2]
  ];

  private draw(): void {
    this.svg = d3.select('#area')
      .append('svg')
      // .style('background-color', '#009541')
      .attr('width', this.width)
      .attr('height', this.height);

    /* const txt = this.svg.append('text')
      .attr('x', 20)
      .attr('y', 20)
      .attr('id', 'txt')
      .text('Area in D3.js') */

    const points = this.svg.append('g')
      .selectAll('circle')
      .data(this.dataset)
      .enter()
      .append('circle')
      .attr('id', (d: any, i: any) => `point-${i}`)
      .attr('cx', (d: any) => d[0])
      .attr('cy', (d: any) => d[1])
      .attr('r', 5)
      .attr('fill', 'transparent')

    const areaGenerator = d3.area();
    // areaGenerator.x((d: any) => d[0]);
    // areaGenerator.y((d: any) => d[1]);
    areaGenerator.y0(this.height / 2);
    // console.log(areaGenerator.y0());

    const path = this.svg.append('path')
      .attr('d', areaGenerator(this.dataset as Array<any>))
      .attr('fill', '#FFCA00');

    // this.svg.append('circle')
    //   .attr('cx', this.width / 2)
    //   .attr('cy', this.height / 2)
    //   .attr('r', 120)
    //   .attr('fill', '#312682')
    
    const nextCurve = () => {
      const curves = Object.entries(curvesObj);
      console.log(curves);
      ix++;
      ix = (ix === curves.length) ? 0 : ix;
      console.log(ix)
      areaGenerator.curve(curves[ix][1]);
      this.svg.select('path')
      .transition()
      .duration(1000)
      .ease(d3.easeLinear)
      // .delay((d: any, i: any) => i * 1000)
      .attr('d', areaGenerator(this.dataset as any));

      this.svg.select('text').text(curves[ix][0]);
      this.svg.selectAll('circle').remove();
    }

    const btn = d3.select('#area')
    .append('div')
    .append('button')
    .attr('class', 'btn btn-primary')
    .text('Change Area')
    .on('click', nextCurve);

    let ix = 0;
    const curvesObj = {
      curveBasis: d3.curveBasis,
      curveBasisClosed: d3.curveBasisClosed,
      curveBasisOpen: d3.curveBasisOpen,
    /*  curveBundle: d3.curveBundle,
      curveCardinal: d3.curveCardinal.tension(0),
      curveCardinalClosed: d3.curveCardinalClosed,
      curveCardinalOpen: d3.curveCardinalOpen,
      curveCatmullRom: d3.curveCatmullRom,
      curveCatmullRomClosed: d3.curveCatmullRomClosed,
      curveCatmullRomOpen: d3.curveCatmullRomOpen, */
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
  };

  constructor() { }

  ngOnInit(): void {
    this.draw();
  }

}
