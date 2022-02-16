import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { timer } from 'rxjs';

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
    {name: 'Germany', value: 100000},
    {name: 'USA', value: 150000},
    {name: 'France', value: 75000},
    {name: 'UK', value: 250000},
    {name: 'Italy', value: 99000},
    {name: 'Spain', value: 72000},
    {name: 'Portugal', value: 20000},
    {name: 'Austria', value: 10000},
    {name: 'Belgium', value: 125000},
    {name: 'Switzerland', value: 30000},
    {name: 'Brazil', value: 50000},
    {name: 'Argentina', value: 30000},
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
    this.updateData();
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
      .ticks(5)
      .tickSizeOuter(0)
      // .tickSizeInner(0)
      // .tickPadding(5)
      .tickFormat((d: any) => d === 0 ? '0' : `${d / 1000}M`);

    d3.select('#ordinal-g-x-axis')
      .transition()
      .duration(450)
      .call(axisX as any)
      .attr('transform', `translate(0, ${this.height - this.margin.bottom})`);

    // *** axisY *** //
    const axisY = d3.axisLeft(this.scaleY);
      
    d3.select('#ordinal-g-y-axis')
      .transition()
      .ease(d3.easeLinear)
      .duration(550)
      .delay((d, i) => i * 500)
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
      .attr('y', (d) => this.scaleY(d.name) - this.scaleY.bandwidth() + this.scaleY.bandwidth())
      .attr('height', this.scaleY.bandwidth())
      .attr('id', (d: any, i: number) => `rects-Ordinal-${i}`)
      .transition()
      .ease(d3.easeLinear)
      .duration(500)
      .delay((d, i) => i * 50)
      .attr('width', (d) => this.scaleX(d.value) - this.scaleX(this.margin.left))
      .attr('fill', (d: any, i: any) => this.colors(d.name))
  };

  // *** MouseEvents *** //
  mouseEvents(): void {
    const mouseEnter = (event: any) => {
      const target = event.target; // outra forma de recuperar o this
      d3.select(target)
        .attr('opacity', 0.5)
        .attr('stroke', '#000')
        .attr('cursor', 'pointer');
    };
    const mouseLeave = (event: any) => {
      const target = event.target;
      d3.select(target)
        .attr('opacity', 1)
        .attr('stroke', 'none')
        .attr('cursor', 'default');
    };

    const mouseClick = (event: any) => {
      const target = event.target;
      const id = target.id;
      const index = id.split('-')[2];
      const name = this.data[index].name;
      const value = this.data[index].value;
      const newValue = this.data[index].value = value + 50000;

    this.changeData(name, newValue);
    };

    d3.selectAll('rect')
      .on('mouseenter', mouseEnter)
      .on('mouseleave', mouseLeave)
      .on('click', mouseClick);
  };

  // *** ChangeData *** //
  changeData(name: string, value: number): void {
    const index = this.data.findIndex((d) => d.name === name);
    this.data[index].value = value;
    this.data.sort((a, b) => b.value - a.value);
    this.drawUpdate();
  };

  // *** update Data *** //
  updateData(): void {
    setInterval(() => {
      console.log('rodei')
      this.data.map((d) => {
        const newValue = d.value + Math.floor(Math.random() * (100000 - 50000) + 50000);
        this.changeData(d.name, newValue);
      });
    }, 5000);
  };

}
