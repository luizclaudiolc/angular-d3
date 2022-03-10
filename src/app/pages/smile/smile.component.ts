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
  private margins = { top: 20, bottom: 20, left: 20, rigth: 20 };
  private width = 750;
  private height = 400;
  private propertyEyes = {
    offset: 100,
    rx: 20,
    ry: 30,
  }

  private drawSmile(): void {
    this.svg = d3.select('#smile')
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height)
      .style('background-color', '#fff');

      const circlePrincipal = this.svg.append('g')
        .append('circle')
        .attr('cx', this.width / 2)
        .attr('cy', this.height / 2)
        .attr('r', 195)
        .attr('fill', '#fff000')
        .attr('stroke', '#000')
        .attr('stroke-width', 7)
        .style('cursor', 'pointer');

      const eyeLeft = this.svg.append('g')
        .append('ellipse')
        .attr('cx', this.width / 2 - this.propertyEyes.offset)
        .attr('cy', this.height / 2.5)
        .attr('rx', this.propertyEyes.rx)
        .attr('ry', this.propertyEyes.ry)
        .attr('fill', '#000')
        .attr('id', 'eyeLeft');

      const eyeRight = this.svg.append('g')
        .append('ellipse')
        .attr('cx', this.width / 2 + this.propertyEyes.offset)
        .attr('cy', this.height / 2.5)
        .attr('rx', this.propertyEyes.rx)
        .attr('ry', this.propertyEyes.ry)
        .attr('fill', '#000')
        .attr('id', 'eyeRight');

      const blinkLeft = this.svg.append('g')
        .append('ellipse')
        .attr('cx', this.width / 2 - this.propertyEyes.offset)
        .attr('cy', this.height / 5 - 5)
        .attr('rx', this.propertyEyes.rx + 5)
        .attr('ry', this.propertyEyes.ry + 5)
        .attr('fill', '#fff000')
        .attr('id', 'blinkLeft')
        .attr('class', 'piscar');

      const blinkRight = this.svg.append('g')
        .append('ellipse')
        .attr('cx', this.width / 2 + this.propertyEyes.offset)
        .attr('cy', this.height / 5 - 5)
        .attr('rx', this.propertyEyes.rx + 5)
        .attr('ry', this.propertyEyes.ry + 5)
        .attr('fill', '#fff000')
        .attr('id', 'blinkRight')
        .attr('class', 'piscar');

      const smile = this.svg.append('g')
        .attr('id', 'smile')
        .attr('transform', `translate(${this.width / 2}, ${this.height / 2 + 20})`);

      smile.append('path')
        .attr('d', d3.arc()
          .innerRadius(100)
          .outerRadius(120)
          .startAngle(Math.PI / 2)
          .endAngle(Math.PI / 2 + Math.PI)
          .padAngle(0.4)
          .cornerRadius(10)
          );
  }

  constructor() { }

  ngOnInit(): void {
    this.drawSmile();
    this.blinkEyes();
  }

  public blinkEyes(): void {
    d3.selectAll('circle')
      .on('mousedown', this.mousedown)
      .on('mouseup', this.mouseup);
  }

  public mousedown(event: any): void {
    const { offsetX, offsetY } = event;
    console.log(`offsetX: ${offsetX}  |  offsetY: ${offsetY}`);
      d3.selectAll('.piscar')
        .transition()
        .duration(150)
        .attr('cy', 163);
  }

  public mouseup(event: any): void {
    d3.selectAll('.piscar')
      .transition()
      .duration(150)
      .attr('cy', 75);
  }
}
