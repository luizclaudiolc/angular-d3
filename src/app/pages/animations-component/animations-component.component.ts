import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-animations-component',
  templateUrl: './animations-component.component.html',
  styleUrls: ['./animations-component.component.scss']
})
export class AnimationsComponentComponent implements OnInit {
  private margin = { top: 40, right: 20, bottom: 40, left: 20 };
  private width = 750;
  private height = 400;

  private draw(): void {
    const svg = d3.select('#animations')
      .append('svg')
      .style('background-color', '#ccc')
      .attr('width', this.width)
      .attr('height', this.height)
      .append('g')
      .attr('transform', `translate(${this.margin.left},${this.margin.right})`);

    const circle = svg.append('circle')
      .attr('cx', 100)
      .attr('cy', this.height / 2)
      .attr('r', 25)
      .attr('fill', '#0ff')
      .on('click', function() {
        animate();
      });

    const animate = () => {
      circle.transition()
        .duration(1200)
        .ease(d3.easeExpOut)
        .attr('cx', 600)
        .attr('fill', '#f00')
        .attr('r', 50)
      .transition()
        .duration(1200)
        .ease(d3.easeBounceOut)
        .attr('cx', 100)
        .attr('fill', '#0ff')
        .attr('r', 25)
      .on('end', animate)
    }
  };

  constructor() { }

  ngOnInit(): void {
    this.draw();
  }

}
