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
  

  private drawBubble(): void {
    this.svg = d3.select('#bubble')
      .append('svg')
      .style('background-color', '#fff')
      .attr('width', this.width)
      .attr('height', this.height)

    // add botão para mudança do dataset
    d3.select('#bubble')
      .append('div')
      .append('button')
      .attr('class', 'btn btn-primary')
      .text('Init dataset')
      .on('click', function () {
        d3.select(this)
          .text('Dataset changed');
          changDataset();
      })

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

    const container = this.svg.append('g')
      .attr('clip-path', 'url(#clip)');

    const tooltip = d3.select('#bubble')
      .append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0)
      .style('position', 'absolute')
      .style('background-color', '#fff')
      .style('border', '1px solid #000')
      .style('border-radius', '5px')
      .style('padding', '10px')
      .style('font-size', '12px');

    let dataset: Array<any>;
    
    const changDataset = () => {
      // dataset size randomizer number between 60 and 100
      const  size = Math.round(Math.random() * 40) + 60;
      
      dataset = [];

      for (let i = 0; i < size; i++) {
        dataset.push({
          weight: Math.round(Math.random() * 100), // random weight between 60 and 100
          height: Math.round(Math.random() * 60) + 140, // random height between 140 and 200
          age: Math.round(Math.random() * 50), // random age between 60 and 100
        })
      }
      console.log(dataset);
      drawChart();
    }
    
    // criação do gráfico
    const drawChart = () => {
      // scales
      const scaleX = d3.scaleLinear()
        .domain(d3.extent(dataset, (d) => d.weight) as [number, number])
        .range([this.margin.left, this.width - (this.margin.left + this.margin.rigth)]);
        
      const scaleY = d3.scaleLinear()
        .domain(d3.extent(dataset, (d) => d.height) as [number, number])
        .range([this.height - (this.margin.bottom + this.margin.top), this.margin.top]);

      const scaleRigth = d3.scaleLinear()
        .domain(d3.extent(dataset, (d) => d.age) as [number, number])
        .range([this.height - (this.margin.top + this.margin.bottom), this.margin.top]);

      const scaleS = d3.scaleSqrt()
        .domain(d3.extent(dataset, (d) => d.weight / d.height) as [number, number])
        .range([8, 20]);

      const scaleColors = d3.scaleDiverging(d3.interpolateSpectral)
        .domain([
          d3.max(dataset, (d) => d.weight / d.height) as number,
          d3.median(dataset, (d) => d.weight / d.height) as number,
          d3.min(dataset, (d) => d.weight / d.height) as number,
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
        .attr('stroke', (d: any) => d === d3.min(dataset, d => d.height) ? 'none' : '#cece')
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
      const circles = container.selectAll('circle').data(dataset);
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
        .attr('r', (d: any) => scaleS(d.weight / d.height))
        .attr('fill', (d: any) => scaleColors(d.weight / d.height))
        .attr('stroke', 'gray')
        .attr('opacity', 0.8);

      circles
        .transition()
        .duration(2000)
        .attr('cx', (d: any) => scaleX(d.weight))
        .attr('cy', (d: any) => scaleY(d.height))
        .attr('r', (d: any) => scaleS(d.weight / d.height))
        .attr('fill', (d: any) => scaleColors(d.weight / d.height)) // cor do circulo de acordo com o valor do peso/altura
        .attr('stroke', 'gray')
        .attr('opacity', 0.8);        

      circles.exit() // remove circles
        .transition()
        .duration(2000)
        .attr('r', 0)
        .remove();

      // Eventos de mouse
      function mousedown (this: any, event: any, d: any) {
        d3.select(this)
          .attr('r', (d: any) => scaleS(d.weight / d.height) + 5)
          .style('stroke', '#000');
      }
  
      function mouseup (this: any, event: any, d: any) {
        d3.select(this)
          .attr('r', (d: any) => scaleS(d.weight / d.height))
          .style('stroke', 'gray');
      }

      function mouseover(this: any, event: any, d: any) {
        d3.select(this)
          .style('stroke', '#000')
          .style('stroke-width', 2)
          .style('cursor', 'pointer');
  
        tooltip
          .style('opacity', 0.8)
          .style('left', `${event.pageX + 30}px`)
          .style('top', `${event.pageY - 30}px`)
          .html(`
          Largura: ${d.weight}
          <br>
          Altura: ${d.height}
          `);
      }
  
      function mousemove (this: any, event: any, d: any) {
        tooltip
          .style('left', `${event.pageX + 30}px`)
          .style('top', `${event.pageY - 30}px`)
          .style('cursor', 'pointer');
      }
  
      function mouseout (this: any, event: any, d: any) {
        d3.select(this)
        .style('stroke', 'gray')
        .style('stroke-width', 1)
        .style('opacity', 0.8);
  
        tooltip
          .style('opacity', 0);
      }

      d3.selectAll('.grid')
        .selectAll('line')
          .on('mouseenter', function () {
            d3.select(this)
              .attr('stroke', '#0f0')
              .attr('stroke-width', 2)
              .attr('cursor', 'pointer');
          })
          .on('mouseout', function () {
            d3.select(this)
              .attr('stroke', '#cece')
              .attr('stroke-width', 1)
              .attr('cursor', 'pointer');
          })

      d3.selectAll('circle')
      .on('mouseenter', mouseover)
      .on('mousemove', mousemove)
      .on('mouseleave', mouseout)
      .on('mousedown', mousedown)
      .on('mouseup', mouseup);
    }
  };


  constructor() { }

  ngOnInit(): void {
    this.drawBubble();
  }
}
