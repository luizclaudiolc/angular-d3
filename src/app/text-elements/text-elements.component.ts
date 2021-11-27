import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-text-elements',
  templateUrl: './text-elements.component.html',
  styleUrls: ['./text-elements.component.scss']
})
export class TextElementsComponent implements OnInit {
  private svg: any;
  private dimentions = {
    margin: 50,
    width: 750,
    height: 400,
  };

  private createSvg(): void {
    this.svg = d3.select('#text')
      .append('svg')
      .style('background', '#cececc')
      .attr('width', this.dimentions.width)
      .attr('height', this.dimentions.height)
      .append('g')
      .attr('transform', 
      'translate(' + this.dimentions.margin + ',' + this.dimentions.margin + ')');

      this.svg.append('line')
      .attr('x1', -50)
      .attr('x2', 700)
      .attr('y1', 150)
      .attr('y2', 150)
      .attr('stroke', '#000');

    this.svg.append('line')
      .attr('x1', 320)
      .attr('x2', 320)
      .attr('y1', -50)
      .attr('y2', 400)
      .attr('stroke', '#000');

    this.svg
      .append('g')
      .append('text')
      .attr('x', 325)
      .attr('y', 150)
      .text('Hello D3.JS')
      .attr('textLength', 200)
      .style('font-size', 36)
      .style('font-family', 'sans-serif')
      .style('font-style', 'italic')
      .style('font-weight', 'bold')  // como no CSS pode ser numeral ou str
      .attr('alignment-baseline', 'middle')
      .attr('text-anchor', 'middle')
      .attr('stroke', '#f00')
      .attr('stroke-width', 0.5)
      // .attr('letter-spacing', 15)
      .attr('rotate', 0)
  }
  

  constructor() { }

  ngOnInit(): void {
    this.createSvg();

    d3.select('svg')
      .attr('cursor', 'pointer')
      .on('mouseenter', function() {
        d3.select('text')
          .style('font-size', 64)
          .attr('textLength', 400)
          .style('fill', '#f00')
          .attr('stroke', '#000')
          .attr('stroke-width', 2.5)
          // .attr('cursor', 'pointer')
      })
      .on('mouseleave', function() {
        d3.selectAll('text')
          .style('font-size', 32)
          .attr('textLength', 200)
          .style('fill', '#000')
          .attr('stroke', '#f00')
          .attr('stroke-width', 0.5)
          .attr('cursor', 'pointer')
      })
  }

}
