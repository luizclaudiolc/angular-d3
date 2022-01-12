import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-covid-cases',
  templateUrl: './covid-cases.component.html',
  styleUrls: ['./covid-cases.component.scss'],
})
export class CovidCasesComponent implements OnInit {
  private svg: any;
  private margin = { top: 20, left: 40, bottom: 20, rigtht: 20 };
  private width = 750;
  private height = 400;
  private dataset = d3.csv(
    'https://raw.githubusercontent.com/luizclaudiolc/angular-d3/master/src/data/vaccination/vaccination-data.csv'
  );
  private data: any[] = [];
  constructor() {}

  ngOnInit(): void {
    Promise.all([this.dataset]).then((data) => {
      console.log(data);
      this.data = data[0];
      console.log(this.data);
      const Americas = this.data.filter((d) => d.WHO_REGION === 'AMRO'
        && d.PERSONS_FULLY_VACCINATED > 1000000);
      console.log(Americas);

      const tooltip = d3.select('#bar-cases').append('div')
      .attr('class', 'tooltip')
      .style('visibility', 'hidden')
      .style('position', 'absolute')
      .style('background-color', '#fff')
      .style('border', '1px solid #000')
      .style('border-radius', '5px')
      .style('padding', '10px')
      .style('font-size', '12px');

      const mouseover = function (event: any, d: any) {
        tooltip
          .style('visibility', 'visible')
          .style('opacity', 0.8)
          .style('left', `${event.pageX + 30}px`)
          .style('top', `${event.pageY - 30}px`)
          // .style('color', '#0f0f')
          .html(`
            País: ${d.COUNTRY}
            <br>
            Pessoas totalmente vacinadas: 
            <strong>${Number(d.PERSONS_FULLY_VACCINATED).toLocaleString('pt-BR')}
          </strong>`);
      }
  
      const mousemove = function (event: any) {
        tooltip
          .style('left', `${event.pageX + 30}px`)
          .style('top', `${event.pageY - 30}px`);
      }
  
      const mouseout = function () {
        tooltip
          .style('visibility', 'hidden');
      }

      this.svg = d3.select('#bar-cases')
        .append('svg')
        .style('background-color', '#f0f0f0')
        .attr('width', this.width)
        .attr('height', this.height)

      const scaleX = d3.scaleBand()
        .domain(Americas.map((d) => d.ISO3))
        .range([this.margin.left, this.width - this.margin.rigtht])
        .padding(0.1);

      const scaleY = d3.scaleLinear()
        .domain([d3.max(Americas, (d) => Number(d.PERSONS_FULLY_VACCINATED)) as any, 0])
        .range([this.margin.top, this.height - this.margin.bottom]);

      this.svg
        .append('g')
        .attr(
          'transform',
          `translate(${0}, ${
            this.height - this.margin.top
          })`
        )
        .attr('id', 'x-axis');

      this.svg
        .append('g')
        .attr('transform', `translate(${this.margin.left}, ${0})`)
        .attr('id', 'y-axis');

      const axisX = d3.axisBottom(scaleX)
        .tickSizeOuter(0)
        .tickPadding(2);
        d3.select('#x-axis').call(axisX as any);

      const axisY = d3.axisLeft(scaleY)
        .ticks(5)
        .tickSizeOuter(0)
        .tickFormat(d3.format('.1s'));
        d3.select('#y-axis').call(axisY as any);

      this.svg
        .selectAll('rect')
        .data(Americas)
        .enter()
        .append('rect')
        .attr('x', (d: any, i: any) => scaleX(d.ISO3))
        .attr('y', (d: any, i: any) => scaleY(Number(d.PERSONS_FULLY_VACCINATED)))
        .attr('width', scaleX.bandwidth())
        .attr('height', (d: any, i: any) =>
          this.height - this.margin.bottom - scaleY(Number(d.PERSONS_FULLY_VACCINATED))
        )
        .attr('fill', '#cece')
        .attr('stroke', '#000')
        .attr('stroke-width', 0.5)
        
        
      d3.selectAll('rect')
        .on('mouseover', mouseover)
        .on('mousemove', mousemove)
        .on('mouseout', mouseout);
    });
  }
}
