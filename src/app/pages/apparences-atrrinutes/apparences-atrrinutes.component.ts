import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-apparences-atrrinutes',
  templateUrl: './apparences-atrrinutes.component.html',
  styleUrls: ['./apparences-atrrinutes.component.scss']
})
export class ApparencesAtrrinutesComponent implements OnInit {
  private svg: any;
  private margin = 50;
  private width = 750 - (this.margin * 2);
  private height = 400 - (this.margin * 2);
  private points = '100,300 300,100 500,300';

  private createSvg(): void {
    this.svg = d3.select('#apparence')
      .append('svg')
      .attr('width', this.width + (this.margin * 2))
      .attr('height', this.height + (this.margin * 2))
      .append('g')
      .attr('translate', 'transform(' + this.margin + ',' + this.margin + ')')
  }

  private drawTriagulo(): void {
    this.svg.append('polygon')
      .attr('points', this.points)
      .attr('stroke', '#000')
      .attr('fill', '#fff000')
      .attr('stroke-width', 10)
      .attr('stroke-opacity', 0.5)
      .attr('stroke-dasharray', '20, 5, 5') // esse attr precisa ser passado com string
      // .attr('cursor', 'crosshair');
  }

  constructor() { }

  ngOnInit(): void {
    this.createSvg();
    this.drawTriagulo();

    d3.selectAll('polygon')
      .on('mousemove', function() {
        d3.select(this)
          .attr('cursor', 'crosshair');
      })
      .on('mouseout', function() {
        d3.select(this)
          .attr('cursor', 'default');
      })
  }

}
