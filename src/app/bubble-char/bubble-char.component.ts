import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-bubble-char',
  templateUrl: './bubble-char.component.html',
  styleUrls: ['./bubble-char.component.scss']
})
export class BubbleCharComponent implements OnInit {
  private margin = { top: 40, bottom: 40, left: 20, rigth: 20};
  private width = 750;
  private height = 400;
  private svg: any;
  

  private drawBubble(): void {
    this.svg = d3.select('#bubble')
      .append('svg')
      .style('background-color', '#fff')
      .attr('width', this.width)
      .attr('height', this.height)
      .append('g')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.rigth})`);

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
      .attr('transform', `translate(${0}, ${this.height - (this.margin.bottom + this.margin.top)})`)
      .attr('id', 'x-axis');

    this.svg.append('g')
      .attr('transform', `translate(${this.margin.left}, ${0})`)
      .attr('id', 'y-grid')
      .attr('class', 'grid');
    
    this.svg.append('g')
    .attr('transform', `translate(${this.margin.left}, ${0})`)
    .attr('id', 'y-axis');

    /* this.svg.append('polyline')
      .attr('points', `50,50 690,50 690,${(this.height - (this.margin.top + this.margin.bottom) - 45)} `)
      .attr('stroke', '#000')
      .attr('fill', 'none') */
    
    this.svg.append('clipPath') // cria uma area para o gráfico
      .attr('id', 'clip')
      .append('rect')
      .attr('x', 20)
      .attr('y', 45)
      .attr('width', 690)
      .attr('height', 275);

    const container = this.svg.append('g')
      .attr('clip-path', 'url(#clip)');

    let dataset: Array<any>;
    
    const changDataset = () => {
      // dataset size randomizer number between 60 and 100
      const  size = Math.round(Math.random() * 40) + 60;
      
      dataset = [];

      for (let i = 0; i < size; i++) {
        dataset.push({
          weight: Math.round(Math.random() * 100), // random weight between 60 and 100
          height: Math.round(Math.random() * 60) + 140, // random height between 160 and 200
        })
      }
      console.log(dataset);
      drawChart();
    }
    
    // criação do gráfico
    const drawChart = () => {
      // animations end time
      const transitions = d3.transition().duration(2000);

      // scales
      const scaleX = d3.scaleLinear(d3.extent(dataset, (d) => d.weight) as [number, number], 
        [this.margin.left, this.width - (this.margin.left + this.margin.rigth)]);
      
      const scaleY = d3.scaleLinear(d3.extent(dataset, (d) => d.height) as [number, number],
        [this.height - (this.margin.top + this.margin.bottom), this.margin.top]);

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
        .tickSize(-(this.height - (this.margin.top + this.margin.bottom) - 45)) // altura do grid: ;
        .tickSizeOuter(0);
      
      d3.select('#x-grid')
      .transition()
      .duration(2000)
      .call(gridX as any);

      const gridY = d3.axisLeft(scaleY)
        .tickFormat(() => '')
        .tickSize(-690)
        .tickSizeOuter(0);

      d3.select('#y-grid')
      .transition()
      .duration(2000)
      .call(gridY as any);

      d3.selectAll('.grid')
      .selectAll('line')
      .attr('stroke', '#cece')
      .attr('stroke-dasharray', '8 2');

      const axisX = d3.axisBottom(scaleX);
        d3.select('#x-axis')
        .transition()
        .duration(2000)
        .call(axisX as any);
      
      const axisY = d3.axisLeft(scaleY);
        d3.select('#y-axis')
        .transition()
        .duration(2000)
        .call(axisY as any);
      
      // Create circles
      const circles = container.selectAll('circle').data(dataset);
      circles.enter()
        .append('circle')
        .attr('cx', (d: any) => scaleX(d.weight))
        .attr('cy', (d: any) => scaleY(d.height))
        .attr('r', 0)
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

        d3.selectAll('.grid')
        .selectAll('line')
        .on('mouseenter', function () {
          console.log('aqui...')
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
    }

    
  };


  constructor() { }

  ngOnInit(): void {
    this.drawBubble();
    // this.t()
  }

  public t(): void {
    d3.select(this.svg)
      .selectAll('.grid')
      .selectAll('line')
      .on('mouseenter', function () {
        console.log('aqui...')
        d3.select(this)
          .attr('stroke', 'red')
    })
  }

}
