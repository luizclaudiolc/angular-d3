import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-slider-project',
  templateUrl: './slider-project.component.html',
  styleUrls: ['./slider-project.component.scss']
})
export class SliderProjectComponent implements OnInit {
  private svg: any;
  private margins = { top: 20, right: 20, bottom: 20, left: 20 };
  private width = 750;
  private height = 400;
  private data = d3.range(50, 601, 5);
  

  private drawSlider(): void {
    this.svg = d3.select('#slider')
      .append('svg')
      .attr('id', 'svg')
      .style('background-color', '#cece')
      .attr('width', this.width)
      .attr('height', this.height)
      .append('g')
      .attr('transform', `translate(${this.margins.top}, ${this.margins.bottom})`);

    const lines = this.svg
      .selectAll('line')
      .data(this.data)
      .enter()
      .append('line')
      .attr('x1', (d: any) => d)
      .attr('x2', (d: any) => d)
      .attr('y1', 200)
      .attr('y2', (d: any, i: number) => i % 10 === 0 ? 220 : 210)
      .attr('stroke', '#000')
      .attr('class', 'line');

    const drag = d3.drag();
    drag
      .on('start', function (event: MouseEvent) {
        const {x, y} = event;
        d3.select(this)
          .attr('stroke', '#f00')
          .attr('stroke-width', 1.2)
          .style('cursor', 'none')
      })
      .on('drag', function (event: any, d: any) {
        const {x, y} = event;
        
        if (x > 50 && x < 150) {
          d3.select('#svg')
            .transition()
            .duration(1500)
            .style('background-color', '#f0e000');
        } else if (x > 150 && x < 250) {
          d3.select('#svg')
            .transition()
            .duration(1500)
            .style('background-color', '#0f0f');
        } else if (x > 250 && x < 350) {
          d3.select('#svg')
            .transition()
            .duration(1500)
            .style('background-color', '#fefe');
        } else if (x > 350 && x < 450) {
          d3.select('#svg')
            .transition()
            .duration(1500)
            .style('background-color', '#f0f');
        } else if (x > 450 && x < 550) {
          d3.select('#svg')
            .transition()
            .duration(1500)
            .style('background-color', '#00f');
        } else {
          d3.select('#svg')
            .transition()
            .duration(1500)
            .style('background-color', '#cece');
        }

        const el = d3.select(this);
        const xPos = parseInt(el.attr('cx'));
        let newPos = xPos + event.dx;
        
        if (newPos < 50) newPos = 50;
        if (newPos > 600) newPos = 600;
      
        el.attr('cx', newPos);
        pushLines();
      })
      .on('end', function (event: MouseEvent) {
        const {x, y} = event;
        d3.select(this)
          .attr('stroke', '#000')
          .attr('stroke-width', 1.2)
          .style('cursor', 'grab')
      })

    const slider = this.svg
      .append('circle')
      .attr('cx', 50)
      .attr('cy', 200)
      .attr('r', 20)
      .attr('fill', '#fff')
      .attr('stroke', '#000')
      .style('cursor', 'grab')
      .attr('class', 'slider');

    const label = this.svg
      .append('text')
      .attr('x', 50)
      .attr('y', 200)
      .attr('text-anchor', 'middle')
      .attr('alignment-baseline', 'middle')
      .text('')
      .style('pointer-events', 'none')

    const pushLines = () => {
      d3.selectAll('.line')
        .each(function(d: any, i: number) {
          const el = d3.select(this);
          const x = parseInt(el.attr('x1'));
          const sx = parseInt(slider.attr('cx'));
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

          label.text(slider.attr('cx'));
          label.attr('x', slider.attr('cx'));
        })
      }
    
    pushLines();
    // this.pushLines(lines, slider);
    slider.call(drag)
  };

  constructor() { }

  ngOnInit(): void {
    this.drawSlider();
    console.log(this.data)
  }

  /* public pushLines = (lines: any, slider: any) => {
    d3.selectAll('.line')
      .each(function(d: any, i: number) {
        const el = d3.select(this);
        const x = parseInt(el.attr('x1'));
        const sx = parseInt(slider.attr('cx'));
        const dx = Math.abs(sx - x);
        const r = 25;

        if (x >= sx - r && x <= sx + r) {
          const dy = Math.sqrt(Math.abs(r * r - dx * dx));
          el.attr('y1', 200 + dy);
          el.attr('y2', i % 10 === 0 ? 220 + dy : 210 + dy);
        } else {
          el.attr('y1', 200);
          el.attr('y2', i % 10 === 0 ? 220 : 210)
        }
      })
    } */
}
