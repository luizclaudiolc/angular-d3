import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-diverging-scales',
  templateUrl: './diverging-scales.component.html',
  styleUrls: ['./diverging-scales.component.scss']
})
export class DivergingScalesComponent implements OnInit {
  private margin = { top: 20, bottom: 20, left: 20, rigth: 20};
  private width = 750;
  private height = 400;


  private draw(): void {
    const svg = d3.select('#diverging')
      .append('svg')
      .style('background-color', '#cece')
      .attr('width', this.width)
      .attr('height', this.height);

    const scale = d3.scaleDiverging([0, 375, 750], d3.interpolateTurbo);

    svg.selectAll('line')
      .data(d3.range(0, 750)) // 3° parametro é o step(quantidade de espaçamento)
      .enter()
      .append('line')
      .attr('x1', (d) => d)
      .attr('x2', (d) => d)
      .attr('y1', 0)
      .attr('y2', 400)
      .attr('stroke', (d) => scale(d))
  };

  constructor() { }

  ngOnInit(): void {
    this.draw()
  }

}
