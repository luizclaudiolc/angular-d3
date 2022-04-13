import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-bubble-char',
  templateUrl: './bubble-char.component.html',
  styleUrls: ['./bubble-char.component.scss']
})
export class BubbleCharComponent implements OnInit {
  private margin = { top: 40, bottom: 40, left: 30, rigth: 20};
  private width = 750;
  private height = 400;
  private svg: any;
  container: any;
  scaleS: any;
  dataset: any = [];

  constructor() { }

  ngOnInit(): void {
    this.drawBubble();
    this.drawChart();
  }

  drawBubble(): void {
    this.svg = d3.select('#bubble')
      .append('svg')
      .style('background-color', '#fff')
      .attr('width', this.width)
      .attr('height', this.height)

      d3.select('.btn-change-data')
        .on('click', () => this.changDataset());

    // criação dos grupos para melhor organização do codigo
    this.svg.append('g')
      .attr('transform', `translate(${0}, ${this.height - (this.margin.bottom + this.margin.top)})`)
      .attr('id', 'x-grid')
      .attr('class', 'grid');

    this.svg.append('g')
    .attr('transform', `translate(${this.margin.left}, ${0})`)
    .attr('id', 'y-grid')
    .attr('class', 'grid');

    this.svg.append('g')
      .attr('transform', `translate(${0}, ${this.height - (this.margin.bottom + this.margin.top)})`)
      .attr('id', 'x-axis');
    
    this.svg.append('g')
    .attr('transform', `translate(${this.margin.left}, ${0})`)
    .attr('id', 'y-axis');

    this.svg.append('g')
      .attr('transform', `translate(${0}, ${this.margin.rigth})`)
      .attr('id', 'r-axis');
    
    this.svg.append('clipPath') // cria uma area para o gráfico
      .attr('id', 'clip')
      .append('rect')
      .attr('x', this.margin.left)
      .attr('y', 45)
      .attr('width', 670)
      .attr('height', 275);

    this.container = this.svg.append('g')
      .attr('clip-path', 'url(#clip)');
  }

  changDataset = () => {
    // dataset size randomizer number between 60 and 100
    const  size = Math.round(Math.random() * 40) + 60;

    for (let i = 0; i < size; i++) {
      this.dataset.push({
        weight: Math.round(Math.random() * 100), // random weight between 60 and 100
        height: Math.round(Math.random() * 60) + 140, // random height between 140 and 200
        age: Math.round(Math.random() * 50), // random age between 60 and 100
      })
    }
    console.log(this.dataset);
    this.drawChart();
    this.dataset = [];
}
  // criação do gráfico
  drawChart = () => {
    // scales
    const scaleX = d3.scaleLinear()
      .domain(d3.extent(this.dataset, ({ weight }) => weight) as unknown as [number, number])
      .range([this.margin.left, this.width - (this.margin.left + this.margin.rigth)]);
      
    const scaleY = d3.scaleLinear()
      .domain(d3.extent(this.dataset, ({ height }) => height) as unknown as [number, number])
      .range([this.height - (this.margin.bottom + this.margin.top), this.margin.top]);

    const scaleRigth = d3.scaleLinear()
      .domain(d3.extent(this.dataset, ({ age }) => age) as unknown as [number, number])
      .range([this.height - (this.margin.top + this.margin.bottom), this.margin.top]);

    this.scaleS = d3.scaleSqrt()
      .domain(d3.extent(this.dataset, (d: any) => d.weight / d.height) as [number, number])
      .range([8, 20]);

    const scaleColors = d3.scaleDiverging(d3.interpolateSpectral)
      .domain([
        d3.max(this.dataset, (d: any) => d.weight / d.height) as number,
        d3.median(this.dataset, (d: any) => d.weight / d.height) as number,
        d3.min(this.dataset, (d: any) => d.weight / d.height) as number,
      ]);
    
    // Create grid
    const gridX = d3.axisBottom(scaleX)
      .tickFormat(() => '')
      .tickSize(-(this.height - (this.margin.top + this.margin.bottom) - 35)) // altura do grid: ;
      .tickSizeOuter(0);
    
    d3.select('#x-grid')
      .transition()
      .duration(2000)
      .call(gridX as any);

    const gridY = d3.axisLeft(scaleY)
      .tickFormat(() => '')
      .tickSize(-(this.width - (this.margin.left + this.margin.rigth) - 30)) // largura do grid: ;
      .tickSizeOuter(0);

    d3.select('#y-grid')
      .transition()
      .duration(2000)
      .call(gridY as any);

    d3.selectAll('.grid')
      .selectAll('line')
      .attr('stroke', (d: any) => d === d3.min(this.dataset, (d: any) => d.height) ? 'none' : '#cece')
      /* serve trasejar as linhas do grid sendo o primeoro valor tamanho da linha e o 
      segundo valor distancia entre as linhas */
      .attr('stroke-dasharray', '8 2'); 

    const axisX = d3.axisBottom(scaleX);
      d3.select('#x-axis')
      .transition()
      .duration(2000)
      .call(axisX as any);
    
    const axisY = d3.axisLeft(scaleY)
      .ticks(5)
    d3.select('#y-axis')
      .transition()
      .duration(2000)
      .call(axisY as any);

    const axisRigth = d3.axisRight(scaleRigth);
      d3.select('#r-axis')
      .attr('transform', `translate(${this.width - (this.margin.left + this.margin.rigth)}, ${0})`)
      .transition()
      .duration(2000)
      .call(axisRigth as any);

    // Create circles
    const circles = this.container.selectAll('circle').data(this.dataset);
    circles
      .join(
        (enter: any) => enter.append('circle')
          .attr('cx', (d: any) => scaleX(d.weight) as number)
          .attr('cy', (d: any) => scaleY(d.height) as number)
          .attr('id', (d: any, i: any) => `circle-${i}`)
          .attr('r', 0),
        (update: any) => update,
        (exit: any) => exit.exit()
          .attr('r', 0)
          .remove()
      )
      .transition()
      .duration(2000)
      .attr('cx', (d: any) => scaleX(d.weight))
      .attr('cy', (d: any) => scaleY(d.height))
      .attr('r', (d: any) => this.scaleS(d.weight / d.height))
      .attr('fill', (d: any) => scaleColors(d.weight / d.height))
      .attr('stroke', 'gray')
      .attr('opacity', 0.8);

    circles
      .transition()
      .duration(2000)
      .attr('cx', (d: any) => scaleX(d.weight))
      .attr('cy', (d: any) => scaleY(d.height))
      .attr('r', (d: any) => this.scaleS(d.weight / d.height))
      .attr('fill', (d: any) => scaleColors(d.weight / d.height)) // cor do circulo de acordo com o valor do peso/altura
      .attr('stroke', 'gray')
      .attr('opacity', 0.8);        

    circles.exit() // remove circles
      .transition()
      .duration(2000)
      .attr('r', 0)
      .remove();

    this.mouseEvents();
  }

  mouseEvents(): void {
    const mousemove = (event: any, d: any) => {
      const { offsetX, offsetY } = event;
      const isLeft = offsetX < this.width / 2;
      const isTop = offsetY < this.height / 2;
      const { width: tipWidth, height: tipHeight } = 
        document.querySelector<any>('.tooltip').getBoundingClientRect();

      d3.select(event.target)
        .attr('stroke', '#000')
        .attr('stroke-width', '2px')
        .attr('cursor', 'pointer');

      d3.select('.tooltip')
        .style('position', 'absolute')
        .style('background-color', '#0c0101e3')
        .style('border', '1px solid #fff')
        .style('border-radius', '5px')
        .style('padding', '10px')
        .style('color', '#fff')
        .style('left', `${isLeft ? event.pageX + 15 : event.pageX - tipWidth - 15}px`)
        .style('top', `${isTop ? event.pageY + 15 : event.pageY - tipHeight - 15}px`)
        .transition()
        .duration(250)
        .style('opacity', 0.8);

      d3.select('#tooltip-text')
        .html(`
          Largura: ${d.weight}
          <br>
          Altura: ${d.height}
        `)
    }

    const mouseleave = (event: any) => {
      d3.select(event.target)
      .style('stroke', 'gray')
      .style('stroke-width', 1)
      .style('opacity', 0.8);

      d3.select('.tooltip')
        .transition()
        .duration(250)
        .style('opacity', 0);
    }

    const mouseclick = ({ target }: any) => {
      d3.select(target)
        .transition()
        .duration(75)
        .attr('r', (d: any) => this.scaleS(d.weight / d.height) + 20)
        .transition()
        .duration(75)
        .attr('r', (d: any) => this.scaleS(d.weight / d.height));
    }

    d3.selectAll('circle')
    .on('mousemove', mousemove)
    .on('mouseleave', mouseleave)
    .on('click', mouseclick)
  }
}
