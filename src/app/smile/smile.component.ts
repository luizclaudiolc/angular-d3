import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-smile',
  templateUrl: './smile.component.html',
  styleUrls: ['./smile.component.scss']
})
export class SmileComponent implements OnInit {
  private svg: any;
  private margins = {
    margin: 50,
    width: 750,
    height: 400
  };

  private drawSmile(): void {
    this.svg = d3.select('#smile')
      .append('svg')
      .attr('width', this.margins.width)
      .attr('height', this.margins.height)
      .style('background-color', '#fff')
      .append('g')
      .attr('transform', `translate(${this.margins.margin},${this.margins.margin})`);

    this.svg
      .append('g')
      .append('circle')
      .attr('cx', 325)
      .attr('cy', 157)
      .attr('r', 170)
      .style('fill', '#ffff00')
      .attr('stroke', '#000')
      .attr('stroke-width', 6);

      this.svg
      .append('g')
      .append('circle')
      .attr('id', 'eye-left')
      .attr('class', 'eye')
      .attr('cx', 245)
      .attr('cy', 120)
      .attr('r', 30);

      this.svg
      .append('g')
      .append('circle')
      .attr('id', 'eye-rigth')
      .attr('class', 'eye')
      .attr('cx', 405)
      .attr('cy', 120)
      .attr('r', 30);
  }

  constructor() { }

  ngOnInit(): void {
    this.drawSmile();

    d3.selectAll('circle')
      .on('mousemove', function (event: any) {
        const { x, y } = event;
        console.log(`X: ${x} | Y: ${y}`);
        d3.selectAll('.eye')
          .transition()
          .duration(400)
          .attr('r', x > 400 ? 50 : 15)
      })
      .on('mouseout', function () {
        d3.selectAll('.eye')
          .transition()
          .duration(400)
          .attr('r', 30)
      })
  }

}
