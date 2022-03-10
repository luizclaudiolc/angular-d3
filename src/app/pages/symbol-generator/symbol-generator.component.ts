import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { schemeSet3 } from 'd3';

@Component({
  selector: 'app-symbol-generator',
  templateUrl: './symbol-generator.component.html',
  styleUrls: ['./symbol-generator.component.scss']
})
export class SymbolGeneratorComponent implements OnInit {
  private svg: any;
  private margin = {top: 20, right: 40, bottom: 30, left: 40};
  private width = 750;
  private height = 400;
  private colors = d3.schemeYlOrBr[d3.range(7).length];

  private drawSymbol(): void {
    this.svg = d3.select('#symbol')
      .append('svg')
      .style('background-color', '#F6F8FA')
      .attr('width', this.width)
      .attr('height', this.height);

      const g = this.svg.append('g')
        .attr('transform', `translate(${this.margin.left}, ${this.height / 2})`);

      const symbol = d3.symbol().size(1000);

      const shape = d3.scaleOrdinal(d3.symbols);
      const scale = d3.scaleLinear()
        .domain([0, 7])
        .range([this.margin.left, this.width - this.margin.right]);

    g.selectAll('path')
      .data(d3.range(7))
      .enter()
      .append('path')
      .attr('d', (d: any) => symbol.type(shape(d))())
      .attr('fill', (d: any, i: any) => this.colors[i])
      .attr('stroke', '#000')
      .attr('transform', (d: any) => `translate(${scale(d)}, ${0})`);

    d3.selectAll('path')
      .on('mouseenter', function (d: any, i: any) {
        d3.select(this)
          .attr('stroke', '#000')
          .attr('stroke-width', 2);

      })
      .on('mouseout', function (d: any, i: any) {
        d3.select(this)
          .attr('stroke', '#000')
          .attr('stroke-width', 0.75);
      });
  };

  constructor() { }

  ngOnInit(): void {
    this.drawSymbol();
  }

}
