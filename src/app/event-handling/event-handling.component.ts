import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-event-handling',
  templateUrl: './event-handling.component.html',
  styleUrls: ['./event-handling.component.scss']
})
export class EventHandlingComponent implements OnInit {
  private svg: any;
  private margin = {top: 20, right: 20, bottom: 20, left: 20};
  private width = 750;
  private height = 400;

  private drawSvg(): void {
    this.svg = d3.select('#event')
      .append('svg')
      .style('background-color', '#cecece')
      .attr('width', this.width)
      .attr('height', this.height)
      .append('g')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);

    let circulo = this.svg.append('circle')
      .attr('cx', this.width / 2)
      .attr('cy', this.height / 2)
      .attr('r', 75)
      .attr('fill', '#0fe')
      .attr('id', 'aqui')

    d3.select('#aqui')
    .on('mouseenter', function (e: MouseEvent) {
        const {x, y} = e;
        d3.select(this)
        .attr('fill', '#f00')
    })
    .on('mouseleave', function () {
      d3.select(this)
      .attr('fill', '#0fe')
    })
    .on('click', function (e: MouseEvent) {
      const {x, y} = e;
      d3.select(this)
      .attr('fill', '#0f0');
      console.log({x, y})
    })
    .on('dblclick', function () {
      d3.select(this)
      .attr('fill', '#f0f')
    })
  };

  constructor() { }

  ngOnInit(): void {
    this.drawSvg();
  }

}
