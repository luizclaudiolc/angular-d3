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
  dataset = [90, 10, 70, 30, 50, 4, 6, 8, 10, 120];
  colors = d3.schemeSpectral[this.dataset.length]; // serve fazer uma escaça de cor no grafico
  arcGen: any;
  pie: any;

  constructor() {}

  ngOnInit(): void {
    this.drawSvg();
    this.updatePie();
    this.initialAnimation();
    this.mouseEvents();
    this.textWithTotal();
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
      
      d3.select('svg#pie-arc')
        .append('g')
        .attr('id', 'pie-arc-text-dinamic')
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
      .cornerRadius(2)
      .padAngle(0.03)
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

    // const data = this.transformeValueInPercentage(this.dataset);

    // *** create arc generator *** //
    d3.select('g#pie-arc-group')
      .selectAll('path')
      .data(this.pie(this.dataset))
      .join(
        enter => enter.append('path'),
        update => update,
        exit => exit.remove()
      )
      .attr('fill', (d: any, i: any) => this.colors[i])
      .attr('stroke', '#000')
      .attr('d', this.arcGen);
  };

  initialAnimation(): void {
    const { arcGen } = this;
    d3.selectAll('path')
      .transition()
      .duration(350)
      .attrTween('d', (d: any) => {
        const interpolate = d3.interpolate(d.endAngle, d.startAngle);
        return (t: any) => {
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
      this.removeText(el);
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
    const percentage = this.transformeValueInPercentage(el.data().map((d: any) => d.value));
    d3.select('g#pie-arc-text-dinamic')
      .append('text')
      .attr('x', this.width / 2)
      .attr('y', this.height / 2)
      .attr('font-size', '3.5em')
      .attr('fill', '#f00f0f')
      .attr('text-anchor', 'middle')
      .attr('alignment-baseline', 'middle')
      .text((d: any, i: number) => `${percentage.map((d: any) => Math.round(d.percentage))}%`);

    d3.select('g#pie-arc-text-dinamic')
      .append('text')
      .attr('x', this.margin.left)
      .attr('y', this.margin.top)
      .attr('font-size', '1.5em')
      .attr('fill', '#f00f0f')
      .text((d: any, i: number) => `Valor em R$: ${el.data().map((d: any) => d.value)}`);
  };

  removeText(el: any): void {
    d3.select('g#pie-arc-text-dinamic')
      .selectAll('text')
      .remove();
  };

  transformeValueInPercentage(data: Array<any>): any {
    return data.map((d: any) => {
      return { value: d, percentage: (d * 100) / this.dataset.reduce((a, b) => a + b) };
    });
  }

  textWithTotal(): void {
    d3.select('g#pie-arc-text-dinamic')
      .append('text')
      .attr('x', this.width / 2 + 150)
      .attr('y', this.margin.top + 30)
      .attr('font-size', '3.5em')
      .attr('fill', '#f00f0f')
      // .text('aqui')
  };
}

