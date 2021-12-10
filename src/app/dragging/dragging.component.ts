import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-dragging',
  templateUrl: './dragging.component.html',
  styleUrls: ['./dragging.component.scss']
})
export class DraggingComponent implements OnInit {
  private svg: any;
  private margins = {
    top: 20,
    right: 20,
    bottom: 20,
    left: 20,
  }; 
  private width = 750 - (this.margins.left + this.margins.right);
  private height = 500 - (this.margins.top + this.margins.bottom);

  private drawChart() {
    this.svg = d3.select('#dragging')
      .append('svg')
      .style('background-color', '#f5f5f5')
      .attr('width', this.width)
      .attr('height', this.height)
      .append('g')
      .attr('transform', `translate(${this.margins.left}, ${this.margins.top})`);

    const circle = this.svg.append('circle')
      .attr('cx', this.width / 2)
      .attr('cy', this.height / 2)
      .attr('r', 50)
      .attr('fill', '#f00');

    const drag = d3.drag();

    drag.on('start', function () {
      console.log('start');
      d3.select(this)
        .attr('stroke', '#000')
        .attr('stroke-width', 2)
        .attr('opacity', 0.5)
        .style('cursor', 'drag');
    });
    drag.on('drag', function (event: any) {
      const {x, y} = event;
      console.log({x, y})
      const el = d3.select(this);
      el.attr('cx', parseInt(el.attr('cx')) + event.dx) // soma a posição atual com a posição do movimento
        .attr('cy', parseInt(el.attr('cy')) + event.dy) // soma a posição atual com a posição do movimento
        .attr('fill', x > 350 ? 'blue' : y < 200 ? 'pink' : 'purple')
      });
    drag.on('end', function () {
      console.log('end');
      d3.select(this)
        .attr('stroke', 'none')
        .attr('opacity', 1)
        .style('cursor', 'default');
    });

    circle.call(drag);
  };

  constructor() { }

  ngOnInit(): void {
    this.drawChart();
  }

}
