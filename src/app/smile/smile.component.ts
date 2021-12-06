import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { arc } from 'd3';

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
    height: 400,
    raio: 30,
    eyeOffsetY: 80
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
      .attr('cx', (this.margins.width / 2) - this.margins.margin)
      .attr('cy', (this.margins.height / 2) - this.margins.margin)
      .attr('r', 170)
      .style('fill', '#ffff00')
      .attr('stroke', '#000')
      .attr('stroke-width', 6);

      this.svg
      .append('g')
      .append('ellipse')
      .attr('id', 'eye-left')
      .attr('class', 'eye')
      .attr('cx', this.margins.width / 2 - 130)
      .attr('cy', this.margins.height / 2 - this.margins.eyeOffsetY)
      .attr('rx', 20)
      .attr('ry', 30)

      this.svg
      .append('g')
      .append('ellipse')
      .attr('id', 'eye-rigth')
      .attr('class', 'eye')
      .attr('cx', this.margins.width / 2 + 30)
      .attr('cy', this.margins.height / 2 - this.margins.eyeOffsetY)
      .attr('rx', 20)
      .attr('ry', 30)

      this.svg
      .append('g')
      .append('circle')
      .attr('class', 'piscar')
      .attr('cx', (this.margins.width / 2) + 30)
      .attr('cy', (this.margins.height / 2) - 140)
      .attr('r', this.margins.raio - 1)
      .style('fill', "#ffff00");

      this.svg
      .append('g')
      .append('circle')
      .attr('class', 'piscar')
      .attr('cx', (this.margins.width / 2) - 130)
      .attr('cy', (this.margins.height / 2) - 140)
      .attr('r', this.margins.raio - 1)
      .style('fill', "#ffff00");

      const g = this.svg
        .attr('id', 'sorriso')
        .append('g')
        .attr('transform', `translate(${this.margins.width / 2 - 50},${190})`)

      g.append('path')
        .attr('d', arc()
        .innerRadius(80)
        .outerRadius(100)
        .startAngle(Math.PI / 2)
        .endAngle(Math.PI / 2 + Math.PI))
  }

  constructor() { }

  ngOnInit(): void {
    this.drawSmile();
    // this.createEye();
    this.moveEye();
  }

  public createEye(): void {
    d3.selectAll('circle')
      .on('mousemove', function (event: any) {
        const { x, y } = event;
        console.log(`X: ${x} | Y: ${y}`);
        d3.selectAll('.eye')
          .transition()
          .duration(100)
          .attr('r', x > 400 ? 50 : 25)
      })
      .on('mouseout', function () {
        d3.selectAll('.eye')
          .transition()
          .duration(400)
          .attr('r', 35)
      })
  }

  public moveEye(): void {
    d3.selectAll('circle')
      .attr('cursor', 'pointer')
      .on('mousedown', function(event: any) {
        const { offsetX, offsetY } = event;
        console.log(`offsetX: ${offsetX}  |  offsetY: ${offsetY}`);
          d3.selectAll('.piscar')
            .transition()
            .duration(150)
            .attr('cy', 115)
      })
      .on('mouseup', function() {
        d3.selectAll('.piscar')
          .transition()
          .duration(150)
          .attr('cy', 55)
      })
  }
}
