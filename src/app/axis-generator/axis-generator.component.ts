import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-axis-generator',
  templateUrl: './axis-generator.component.html',
  styleUrls: ['./axis-generator.component.scss']
})
export class AxisGeneratorComponent implements OnInit {
  private margin = { top: 40, right: 20, bottom: 40, left: 20 };
  private width = 750;
  private height = 400;

  private monthNames = [
    'Jan',
    'Fev',
    'Mar',
    'Abr',
    'Mai',
    'Jun',
    'Jul',
    'Ago',
    'Set',
    'Out',
    'Nov',
    'Dez'
  ];

  private dataset = [10, 12, 46, 88, 105, 152, 250, 320, 500, 811];

  private drawAxis(): void {
    const svg = d3.select('#axis')
      .append('svg')
      .style('background-color', '#cece')
      .attr('width', this.width)
      .attr('height', this.height)
      .append('g')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.right})`);

    
    const scaleX = d3.scalePoint() //
      .domain(this.monthNames)
      .range([this.margin.left, this.width - (this.margin.left + this.margin.right)]); // talvex corrigir aqui

    const scaleY = d3.scaleLinear(d3.extent(this.dataset) as [number, number], 
      [this.height - (this.margin.bottom + this.margin.top), this.margin.top]);

    const axisX = d3.axisBottom(scaleX)
      .tickSize(5);
    
    const axisY = d3.axisLeft(scaleY)
      .ticks(10)
      /* Serve para fazer logicas de personalização do seu eixo */
      .tickFormat((d) => d >= 10000 ? `R$ ${Number(d) / 1000} M` : `${d} m`)
      // serve para, se necessário, alterar o valor do eixo
      // .tickValues([15, 100, 200, 300, 400, 500, 600, 700, d3.max(this.dataset) as number]); 

    const gridY = d3.axisLeft(scaleY)
      .tickSize(-690)
      .tickFormat(() => '')
      .tickSizeOuter(0);

    svg.append('g')
      .attr('transform', `translate(${0}, ${this.height - (this.margin.bottom + this.margin.top)})`)
      .call(axisX)
      .selectAll('text')
      .attr('font-size', '12px')
      .attr('transform', 'rotate(15)')

    svg.append('g')
      .attr('transform', `translate(${this.margin.left}, ${0})`)
      .call(axisY);

    svg.append('g')
    .attr('transform', `translate(${this.margin.left}, ${0})`)
    .call(gridY)
    .selectAll('line')
    .attr('stroke', '#ccc')
    .attr('stroke-dasharray', '5,2')
    .attr('stroke-width', '1px');
  };

  constructor() { }

  ngOnInit(): void {
    this.drawAxis();
  }

}
