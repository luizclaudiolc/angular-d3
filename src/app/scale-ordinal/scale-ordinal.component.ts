import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-scale-ordinal',
  templateUrl: './scale-ordinal.component.html',
  styleUrls: ['./scale-ordinal.component.scss']
})
export class ScaleOrdinalComponent implements OnInit {
  svg: any;
  margin = {top: 20, bottom: 30, left: 65, rigth: 20};
  width = 750;
  height = 400;
  data = [
    {name: 'Germany', value: 8940000},
    {name: 'USA', value: 5000000},
    {name: 'France', value: 7200000},
    {name: 'UK', value: 6200000},
    {name: 'Italy', value: 6200000},
    {name: 'Spain', value: 5000000},
    {name: 'Portugal', value: 1550000},
    {name: 'Austria', value: 300000},
    {name: 'Belgium', value: 300000},
    {name: 'Switzerland', value: 300000},
  ];
  scaleX: any;
  scaleY: any;
  rects: any;
  colors = d3.scaleOrdinal(d3.schemeCategory10);

  constructor() { }

  ngOnInit(): void {
    this.drawSvg();
    this.drawUpdate();
    this.mouseEvents();
  }

  drawSvg(): void {
    this.svg = d3.select('#ordinal')
      .append('svg')
      // .style('background-color', '#cecece')
      .attr('width', this.width)
      .attr('height', this.height)
      .attr('id', 'ordinal-svg');

    d3.select('svg#ordinal-svg').append('g').attr('id', 'ordinal-g-x-axis');
    d3.select('svg#ordinal-svg').append('g').attr('id', 'ordinal-g-y-axis');
    d3.select('svg#ordinal-svg').append('g').attr('id', 'ordinal-g-rects');
  };

  drawUpdate(): void {
    if (!this.data.length) return;

    // update chart
    d3.select('#ordinal-svg')
      .attr('width', this.width)
      .attr('height', this.height);

    // *** scaleX *** //
    const XDomain = [0, d3.max(this.data, (d) => d.value) as number];
    this.scaleX = d3.scaleLinear()
      .domain(XDomain)
      .range([this.margin.left, this.width - this.margin.rigth]);

    // *** scaleY *** //
    const YDomain = this.data.map((d) => d.name);
    this.scaleY = d3.scaleBand()
      .domain(YDomain)
      .range([this.height -this.margin.bottom, this.margin.top])
      .padding(0.1)
      .paddingInner(0.5)
      .paddingOuter(0.5);

    // *** axisX *** //
    const axisX = d3.axisBottom(this.scaleX)
      .tickSizeOuter(0)
      // .tickSizeInner(0)
      // .tickPadding(5)
      .tickFormat((d: any) => d === 0 ? '0' : `${d / 1000}M`);

    d3.select('#ordinal-g-x-axis')
      .call(axisX as any)
      .attr('transform', `translate(0, ${this.height - this.margin.bottom})`);

    // *** axisY *** //
    const axisY = d3.axisLeft(this.scaleY);
      
    d3.select('#ordinal-g-y-axis')
      .call(axisY as any)
      .attr('transform', `translate(${this.margin.left}, 0)`)
      .selectAll('line')
      .attr('stroke', 'none');

    d3.select('#ordinal-g-y-axis')
      .selectAll('text')
      .attr('id', (d: any, i: any) => `text-${i}`);

    d3.select('#ordinal-g-y-axis')
      .selectAll('.domain')
      .attr('stroke', 'none');

    // *** rects *** //
    this.rects = d3.select('#ordinal-g-rects')
      .selectAll('rect')
      .data(this.data)
      .join(
        (enter) => enter.append('rect'),
        (update) => update,
        (exit) => exit.remove()
      )
      .attr('x', (d) => this.scaleX(this.margin.left))
      .attr('y', (d) => this.scaleY(d.name) - this.scaleY.bandwidth() + this.margin.top)
      .attr('height', this.scaleY.bandwidth())
      .transition()
      .ease(d3.easeLinear)
      .duration(500)
      .delay((d, i) => i * 50)
      .attr('width', (d) => this.scaleX(d.value) - this.scaleX(this.margin.left))
      .attr('fill', (d: any, i: any) => this.colors(d.name))
      .attr('id', (d: any, i: number) => `rects-Ordinal-${i}`);
  };

  // *** MouseEvents *** //
  mouseEvents(): void {
    const mouseEnter = (event: any) => {
      const target = event.target; // outra forma de recuperar o this
      d3.select(target)
        .attr('opacity', 0.5)
        .attr('stroke', '#000');
    };
    const mouseLeave = (event: any) => {
      const target = event.target;
      d3.select(target)
        .attr('opacity', 1)
        .attr('stroke', 'none');
    };

    const mouseClick = (event: any) => {
      const target = event.target;
      const id = target.id;
      const index = id.split('-')[2];
      const name = this.data[index].name;
      const value = this.data[index].value;
      console.log(`${name} - ${value}`);
    };

    d3.selectAll('rect')
      .on('mouseenter', mouseEnter)
      .on('mouseleave', mouseLeave)
      .on('click', mouseClick);
  };

}
