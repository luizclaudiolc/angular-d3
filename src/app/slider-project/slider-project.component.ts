import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-slider-project',
  templateUrl: './slider-project.component.html',
  styleUrls: ['./slider-project.component.scss']
})
export class SliderProjectComponent implements OnInit {
  constructor() { }
  svg: any;
  margins = { top: 20, right: 50, bottom: 20, left: 50 };
  width = 750;
  height = 400;
  data = d3.range(this.margins.left, this.width - this.margins.right, 5);
  lines: any;
  circle: any;
  label: any;

  ngOnInit(): void {
    this.drawSlider();
    this.updateSlider();
    this.pushLines();
    this.moveSlider();
  }

  drawSlider(): void {
    this.svg = d3.select('#slider')
      .append('svg')
      // .style('background-color', '#FAF8F6')
      .attr('width', this.width)
      .attr('height', this.height)
      .attr('id', 'slider-container');

    d3.select('svg#slider-container').append('g').attr('id', 'g-lines');
    d3.select('svg#slider-container').append('g').attr('id', 'g-circle');
    d3.select('svg#slider-container').append('g').attr('id', 'g-label');
  };

  updateSlider(): void {
    if (!this.data.length) return;

    /* Updates svg dimentios */
    d3.select('#slider-container')
      .attr('width', this.width)
      .attr('heigth', this.height);

    this.lines = d3.select('#g-lines')
      .selectAll('line')
      .data(this.data)
      .join(
        enter => enter.append('line'),
        update => update,
        exit => exit.remove()
      )
      .attr('x1', d => d)
      .attr('x2', d => d)
      .attr('y1', this.height / 2)
      .attr('y2', (d: any, i: number) => 
        i % 10 === 0 ? (this.height / 2) + 20 : (this.height / 2) + 10)
      .attr('stroke', 'gray')
      .attr('class', 'lines');

    this.circle = d3.select('#g-circle')
      .append('circle')
      .attr('cx', this.margins.left)
      .attr('cy', this.height / 2)
      .attr('r', 20)
      .attr('fill', '#FAF8F6')
      .attr('stroke', '#000')
      .style('cursor', 'grap')
      .attr('class', 'slider-circle');

    this.label = d3.select('#g-label')
      .append('text')
      .attr('x', this.margins.left)
      .attr('y', this.height / 2)
      .text('')
      .attr('text-anchor', 'middle')
      .attr('alignment-baseline', 'middle')
      .style('pointer-events', 'none');
  };

  pushLines(): void  {
    const circleSlider = this.circle;
    const labelSlider  = this.label;

    d3.selectAll('.lines')
      .each(function(d: any, i: number) {
        const el = d3.select(this);
        const x = parseInt(el.attr('x1'));
        const sx = parseInt(circleSlider.attr('cx'));
        const dx = Math.abs(sx - x);
        const r = 25;

        if (x >= sx - r && x <= sx + r) {
          const dy = Math.sqrt(Math.abs(r * r - dx * dx));
          el.attr('y1', 200 + dy);
          el.attr('y2', i % 10 === 0 ? 220 + dy : 210 + dy);
        } else {
          el.attr('y1', 200);
          el.attr('y2', i % 10 === 0 ? 220 : 210)
        };

        labelSlider.text(circleSlider.attr('cx'));
        labelSlider.attr('x', circleSlider.attr('cx'));
      })
  };

  moveSlider(): void {
    const drag = d3.drag();

    const dragStart = () => {
      this.circle
        .attr('stroke', '#f00')
        .attr('stroke-width', 2)
        .style('cursor', 'none')
    };

    const dragMove = (event: any) => {
      this.circle
      const {x, y} = event;
      console.log({x, y});

      if (x >= this.margins.left && x < this.width / 2) {
        d3.selectAll('.lines')
          .transition()
          .duration(500)
          .attr('stroke', 'gray')
      } else {
        d3.selectAll('.lines')
          .transition()
          .duration(500)
          .attr('stroke', '#f00');
      }

      const el = d3.selectAll('.slider-circle');
      const xPos = parseInt(el.attr('cx'));
      let newPos = xPos + event.dx;
      console.log(newPos);
      
      if (newPos < this.margins.left) newPos = this.margins.left;
      if (newPos > this.width - this.margins.right) newPos = this.width - this.margins.right;
    
      el.attr('cx', newPos)
      this.pushLines();
    };
    
    const dragEnd = () => {
      this.circle
      .attr('stroke', '#000')
      .attr('stroke-width', 1.2)
      .style('cursor', 'grab');
    };

    drag
      .on('start', dragStart)
      .on('drag', dragMove)
      .on('end', dragEnd);

    this.circle.call(drag);
  };
}
