import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-axis-generator',
  templateUrl: './axis-generator.component.html',
  styleUrls: ['./axis-generator.component.scss']
})
export class AxisGeneratorComponent implements OnInit {
  private margin = { top: 40, right: 40, bottom: 30, left: 50 };
  private width = 750;
  private height = 400;
  private data = {
    monthAndPercentage: [
      { month: 'Jan', percentage: 15 },
      { month: 'Fev', percentage: 45 },
      { month: 'Mar', percentage: 35 },
      { month: 'Abr', percentage: 50 },
      { month: 'Mai', percentage: 20 },
      { month: 'Jun', percentage: 60 },
      { month: 'Jul', percentage: 65 },
      { month: 'Ago', percentage: 50 },
      { month: 'Set', percentage: 35 },
      { month: 'Out', percentage: 100 },
      { month: 'Nov', percentage: 15 },
      { month: 'Dez', percentage: 66 } 
    ]
  };

  private drawAxis(): void {
    const svg = d3.select('#axis')
      .append('svg')
      .style('background-color', '#F6F8FA')
      .attr('width', this.width)
      .attr('height', this.height);
    
    const scaleX = d3.scalePoint() 
      .domain(this.data.monthAndPercentage.map(d => d.month))
      .range([this.margin.left, this.width - this.margin.right]);

    const scaleY = d3.scaleLinear()
      .domain([0, d3.max(this.data.monthAndPercentage, d => d.percentage)] as [number, number])
      .range([this.height - this.margin.bottom, this.margin.top]);

    const axisX = d3.axisBottom(scaleX)
      // .tickSize(5)
      .tickSizeOuter(0);
    
    const axisY = d3.axisLeft(scaleY)
      .ticks(10)
      /* Serve para fazer logicas de personalização do seu eixo */
      .tickFormat((d) => `${d} %`);
      // serve para, se necessário, alterar o valor do eixo
      // .tickValues([15, 100, 200, 300, 400, 500, 600, 700, d3.max(this.dataset) as number]); 

    const gridY = d3.axisLeft(scaleY)
      .tickSize(-this.width + this.margin.left + this.margin.right)
      .tickFormat(() => '')
      .tickSizeOuter(0);

    svg.append('g')
      .attr('transform', `translate(0, ${this.height - this.margin.bottom})`)
      .call(axisX)
      .selectAll('text')
      .attr('font-size', '12px')
      // .attr('transform', 'rotate(-15)')

    svg.append('g')
      .attr('transform', `translate(${this.margin.left}, ${0})`)
      .call(axisY);

    svg.append('g')
    .attr('transform', `translate(${this.margin.left}, ${0})`)
    .call(gridY)
    .selectAll('line')
    .attr('stroke', (d) => d === 0 ? 'none' : '#cece')
    .attr('stroke-dasharray', '5,2')
    .attr('stroke-width', 1.5);

    const line = d3.line()
      .x((d: any) => d[0])
      .y((d: any) => d[1])
      .curve(d3.curveCardinal.tension(0.5));

    svg.append('g')
      .append('path')
      .attr('d', line(this.data.monthAndPercentage.map(d => [scaleX(d.month),
        scaleY(d.percentage)] as [number, number])))
      .attr('stroke-dasharray', '1500') // preciso pegar o getTotalLength() para melhorar essa função
      .attr('stroke-dashoffset', 1500)
      .transition()
      .duration(1000)
      .ease(d3.easeExpIn)
      .attr('stroke-dashoffset', 0)
      .attr('stroke', '#000')
      .attr('stroke-width', 1.5)
      .attr('fill', 'none');

    svg.append('g')
      .selectAll('circle')
      .data(this.data.monthAndPercentage)
      .join(
        (enter: any) => enter.append('circle'),
        (update: any) => update,
        (exit: any) => exit.remove()
      )
      .attr('id', (d: any, i: any) => `circle-${i}`)
      .attr('cx', (d: any) => scaleX(d.month) as any)
      .attr('cy', (d: any) => scaleY(d.percentage))
      .attr('r', 5)
      .attr('fill', '#F6F8FA')
      .attr('stroke', '#000');

    function mouseenter (this: any) {
      d3.select(this)
        .transition()
        .duration(75)
        .style('cursor', 'pointer')
        .attr('r', 7.5)
        .attr('stroke', '#000')
        .attr('stroke-width', 1.5);
    };
    function mouseleave (this: any) {
      d3.select(this)
        .transition()
        .duration(75)
        .attr('r', 5)
        .attr('stroke', '#000')
        .attr('stroke-width', 1);
    };
    function click (this: any) {
      d3.select(this)
        .transition()
        .duration(75)
        .attr('r', 10)
        .attr('stroke', '#000')
        .attr('stroke-width', 1.5)
        .transition()
        .duration(75)
        .attr('r', 7.5)
        .attr('stroke', '#000')
        .attr('stroke-width', 1);
    }

    d3.selectAll('circle')
      .on('mouseenter', mouseenter)
      .on('mouseleave', mouseleave)
      .on('click', click);
  };

  constructor() { }

  ngOnInit(): void {
    this.drawAxis();
  }

}
