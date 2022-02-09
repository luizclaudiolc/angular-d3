import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-arc-pie-generator',
  templateUrl: './arc-pie-generator.component.html',
  styleUrls: ['./arc-pie-generator.component.scss'],
})
export class ArcPieGeneratorComponent implements OnInit {
  svg: any;
  margin = { top: 20, right: 20, bottom: 30, left: 40 };
  width = 750;
  height = 400;
  dataset = [150, 235, 915, 415, 860, 590, 1250, 1320];
  colors = d3.schemeSpectral[this.dataset.length]; // serve fazer uma escaça de cor no grafico
  arcGen: any;
  pie: any;

  constructor() {}

  ngOnInit(): void {
    this.drawSvg();
    this.updatePie();
    this.initialAnimation();
    this.mouseEvents();
  }

  drawSvg(): void {
    this.svg = d3
      .select('#pie-arc')
      .append('svg')
      // .style('background-color', '#F6F8FA')
      .attr('width', this.width)
      .attr('height', this.height)
      .attr('id', 'pie-arc');

      d3.select('svg#pie-arc')
        .append('g')
        .attr('id', 'pie-arc-group')
        .attr('transform', `translate(${this.width / 2}, ${this.height / 2})`);

      d3.select('svg#pie-arc')
        .append('g')
        .attr('id', 'pie-arc-text')
        // .attr('transform', `translate(${this.width / 2}, ${this.height / 2})`);
  };

  updatePie(): void {
    if (!this.dataset.length) return;

    // *** update dimensions *** //
    d3.select('svg#pie-arc')
      .attr('width', this.width)
      .attr('height', this.height);

    // *** create arc generator *** //
    this.arcGen = d3.arc()
      .innerRadius(100)
      .outerRadius(160)
      .cornerRadius(5)
      .padAngle(0.04)
      .padRadius(50);
      // .startAngle(0)
      // .endAngle(Math.PI / 4);

      // d3.select('g#pie-arc-group')
      //   .append('path')
      //   .attr('d', this.arcGen)
      //   .attr('fill', '#ff0000')
      //   .attr('stroke', '#000')
      //   .attr('stroke-width', 2);

    // *** create pie generator *** //
    this.pie = d3.pie();

    // transformar valores em porcentagem
    const data = this.dataset.map((d: any) => {
      return { value: d, percentage: (d * 100) / this.dataset.reduce((a, b) => a + b) };
    });
    console.log(data.map((d: any) => Math.floor(d.percentage)));

    // *** create arc generator *** //
    d3.select('g#pie-arc-group')
      .selectAll('path')
      .data(this.pie(data.map((d) => d.percentage)))
      .join(
        enter => enter.append('path'),
        update => update,
        exit => exit.remove()
      )
      .attr('fill', (d: any, i: any) => this.colors[i])
      .attr('stroke', '#000')
      .attr('stroke-width', 2)
      .attr('d', this.arcGen);
  };

  initialAnimation(): void {
    const { arcGen } = this;
    d3.selectAll('path')
      .transition()
      .duration(350)
      .attrTween('d', function (d: any) {
        const interpolate = d3.interpolate(d.endAngle, d.startAngle);
        return function (t: any) {
          d.startAngle = interpolate(t);
          return arcGen(d);
        };
      });
  };

  mouseEvents(): void {
    const mouseEnter = (event: any) => {
      const el = d3.select(event.target);
      this.animationSlice(el);
      this.addText(el);
    };

    const mouseLeave = (event: any) => {
      const el = d3.select(event.target);
      this.animationSliceBack(el);
    };

    d3.selectAll('path')
      .on('mouseover', mouseEnter)
      .on('mouseout', mouseLeave);
  };

  animationSlice(el: any): void {
    const { arcGen } = this;
    arcGen
      .innerRadius(120)
      .outerRadius(180)

    el
      .transition()
      .duration(200)
      .attr('d', (d: any) => arcGen(d))
  };

  animationSliceBack(el: any): void {
    const { arcGen } = this;
    arcGen
      .innerRadius(100)
      .outerRadius(160)

    el
      .transition()
      .duration(200)
      .attr('d', (d: any) => arcGen(d))
  };

  addText(el: any): void {
    const { arcGen } = this;
    /* const data = this.dataset.map((d: any) => {
      return { value: d, percentage: (d * 100) / this.dataset.reduce((a, b) => a + b) };
    });
    const text = data.map((d: any) => Math.floor(d.percentage)); */

    d3.select('g#pie-arc-text')
      .append('text')
      .attr('x', this.width / 2)
      .attr('y', this.height / 2)
      .attr('font-size', '2.5em')
      .attr('fill', (d: any, i: any) => this.colors[i])
      .attr('text-anchor', 'middle')
      .attr('alignment-baseline', 'middle')
      .text((d: any, i: number) => `%`);
  };
}

