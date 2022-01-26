import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-scale-ordinal',
  templateUrl: './scale-ordinal.component.html',
  styleUrls: ['./scale-ordinal.component.scss']
})
export class ScaleOrdinalComponent implements OnInit {
  private margin = {top: 20, bottom: 20, left: 20, rigth: 20};
  private width = 700;
  private height = 400;
  private data = [110, 12, 15, 25, 680, 101, 125, 320, 512, 700, 823, 502];
  private months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  public scaleX: any;
  public scaleY: any;
  public colors = d3.scaleOrdinal(d3.schemeCategory10);
  

  private draw(): void {
    const svg = d3.select('#ordinal')
      .append('svg')
      .style('background-color', '#cecece')
      .attr('width', this.width)
      .attr('height', this.height)
      .append('g')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.rigth})`);

    /* const scale = d3.scaleOrdinal()
      .domain(this.months)
      .range(this.data);

      console.log(scale('Dec')); */

    svg.selectAll('line')
      .data([this.margin.left, this.width - (this.margin.rigth + this.margin.left)])
      .enter().append('line')
      .attr('x1', (d) => d)
      .attr('x2', (d) => d)
      .attr('y1', this.margin.top)
      .attr('y2', this.height - (this.margin.bottom + this.margin.top))
      .attr('stroke', '#000');

    // Para retangulos(barras)
    /* this.scaleX = d3.scaleBand()
    .domain(this.months)
    .rangeRound([this.margin.left, this.width - (this.margin.left + this.margin.rigth)])
    .paddingOuter(0.2)
    .paddingInner(0.2) */

    // Para circulos
    this.scaleX = d3.scalePoint()
    .domain(this.months)
    .rangeRound([this.margin.left, this.width - (this.margin.left + this.margin.rigth)])
    .padding(0.5)

    this.scaleY = d3.scaleLinear([0, d3.max(this.data) as number], [this.height - (this.margin.bottom + this.margin.top), this.margin.top]);

    /* svg.selectAll('rect')
      .data(this.months)
      .enter()
      .append('rect')
      .attr('x', (d) => this.scaleX(d))
      .attr('y', (d: any, i: number) => this.scaleY(this.data[i]))
      .attr('width', this.scaleX.bandwidth())
      .attr('height', (d: any, i: number) => this.scaleY(0) - this.scaleY(this.data[i]))
      .attr('fill', (d: any, i: number) => this.colors[i]); */

      svg.selectAll('circle')
      .data(this.months)
      .enter()
      .append('circle')
      .attr('cx', (d) => this.scaleX(d))
      .attr('cy', (d: any, i: number) => this.scaleY(this.data[i]))
      .attr('r', 15)
      .attr('fill', (d: any, i: number) => this.colors(d));
  }

  constructor() { }

  ngOnInit(): void {
    this.draw();
  }

}
