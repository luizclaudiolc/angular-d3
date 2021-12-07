import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-text-on-path',
  templateUrl: './text-on-path.component.html',
  styleUrls: ['./text-on-path.component.scss']
})
export class TextOnPathComponent implements OnInit {
  private svg: any;
  private margins = {
    margin: 50,
    width: 750,
    height: 400,
  };
  private path = 'M200,200 Q300,300 400,200';
  private texto = ['Luiz', 'Vicente', 'Levelyn']

  private draw(): void {
    this.svg = d3.select('#text-on-path')
      .append('svg')
      .attr('width', this.margins.width)
      .attr('height', this.margins.height)
      .append('g')
      .attr('transform', `translate(${this.margins.margin},${this.margins.margin})`);

    this.svg
      .append('path')
      .attr('d', this.path)
      .attr('fill', 'none')
      .attr('stroke', '#0f0')
      .attr('id', 'pth')
    
    this.svg
      .append('text')
      .append('textPath')
      .attr('href', '#pth')
      .attr('font-size', 18)
      .text(this.texto.join(', ').toUpperCase())
      .attr('text-anchor', 'middle')
      .attr('startOffset', '50%')
      
      
  }

  constructor() { }

  ngOnInit(): void {
    this.draw();
  }

}
