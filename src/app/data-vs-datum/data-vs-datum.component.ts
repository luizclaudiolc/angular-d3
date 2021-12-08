import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-data-vs-datum',
  templateUrl: './data-vs-datum.component.html',
  styleUrls: ['./data-vs-datum.component.scss']
})
export class DataVsDatumComponent implements OnInit {
  private svg: any;
  private margins = {
    margin: 50,
    width: 750,
    height: 400,
  };
  private data = [5, 16, 18, 12, 13, 55, 14];

  private draw(): void {
    this.svg = d3.select('#data-vs-datum')
      .append('svg')
      .attr('id', 'test')
      .style('background-color', '#f5f5')
      .attr('width', this.margins.width)
      .attr('height', this.margins.height)
      .append('g')
      .attr('transform', `translate(${this.margins.margin},${this.margins.margin})`);
  };

  constructor() { }

  ngOnInit(): void {
    this.draw();
  }

}
