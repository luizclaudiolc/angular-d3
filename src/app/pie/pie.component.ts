import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.scss']
})
export class PieComponent implements OnInit {

  private data = [
    {"Framework": "Vue", "Stars": "166443", "Released": "2014"},
    {"Framework": "React", "Stars": "150793", "Released": "2013"},
    {"Framework": "Angular", "Stars": "62342", "Released": "2016"},
    {"Framework": "Backbone", "Stars": "27647", "Released": "2010"},
    {"Framework": "Ember", "Stars": "21471", "Released": "2011"},
    {"Framework": "Redux", "Stars": "28481", "Released": "2019"},
  ];

  private svg: any;
  private margin = { top: 30, right: 30, bottom: 30, left: 40 };
  private width = 750;
  private height = 600;
  private arcGen: any;
  private colors = d3.schemeReds[this.data.length]; // serve para definir a cor do grafico

  private createPie(): void {
    this.svg = d3.select('#pie')
      .append('svg')
      .style('background-color', '#F6F8FA')
      .attr('width', this.width)
      .attr('height', this.height);

    this.arcGen = d3.arc()
      .innerRadius(100)
      .outerRadius(200)
      .padAngle(0.05)
      .padRadius(50)
      .cornerRadius(5);

    // this.svg
    //   .append('path')
    //   .attr('d', this.arcGen)
    //   .attr('fill', '#f0f')
    //   .attr('stroke', '#121826')
    //   .style('stroke-width', 1)
    //   .attr('transform', `translate(${this.width / 2}, ${this.height / 2})`);

    const pie = d3.pie()(this.data.map((v) => parseInt(v.Stars))); // Declara a função e já passa os dados
    // console.log(pie);

    this.svg
      .selectAll('path')
      .data(pie)
      .join(
        (enter: any) => enter.append('path').attr('d', this.arcGen),
        (update: any) => update.attr('d', this.arcGen),
        (exit: any) => exit.remove()
      )
      .attr('fill', (d: any, i: any) => this.colors[i])
      .attr('stroke', '#121826')
      .style('stroke-width', 0.75)
      // .attr('stroke-dasharray', (d: any, i: any) => i % 3 === 0 ? '5,5' : '0,0')
      .attr('transform', `translate(${this.width / 2}, ${this.height / 2})`);

    this.svg
      .selectAll('text')
      .data(pie)
      .join(
        (enter: any) => enter.append('text'),
        (update: any) => update,
        (exit: any) => exit.remove()
      )
      .text((d: any, i: any) => this.data[i].Framework)
      .attr('x', (d: any) => this.arcGen.centroid(d)[0])
      .attr('y', (d: any) => this.arcGen.centroid(d)[1])
      .attr('transform', `translate(${this.width / 2}, ${this.height / 2})`)
      .attr('text-anchor', 'middle')
      .style('font-size', 14);

      const animateSlice = (path: any) => {
        this.arcGen
        .innerRadius(120)
        .outerRadius(220);

        path.transition()
          .duration(350)
          .attr('d', (d: any) => this.arcGen(d));
      };

      const animateSliceBack = (path: any) => {
        this.arcGen
        .innerRadius(100)
        .outerRadius(200);

        path.transition()
          .duration(350)
          .attr('d', (d: any) => this.arcGen(d));
      };

      d3.selectAll('path')
        .on('mouseover', function () {
          const el = d3.select(this);
          animateSlice(el);
        })
        .on('mouseout', function () {
          const el = d3.select(this);
          animateSliceBack(el);
        });
  };

  
  constructor() { }

  ngOnInit(): void {
    this.createPie();
  }
}
