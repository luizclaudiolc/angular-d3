import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-paths',
  templateUrl: './paths.component.html',
  styleUrls: ['./paths.component.scss']
})
export class PathsComponent implements OnInit {
  private svg: any;
  private margin = 50;
  private width = 750 - (this.margin * 2);
  private heigth = 400 - (this.margin * 2);

  private createSvg(): void {
    this.svg = d3.select('#paths')
      .append('svg')
      .attr('width', this.width + (this.margin * 2))
      .attr('height', this.heigth + (this.margin * 2))
      .append('g')
      .attr('transform', 'translate(' + this.margin + ',' + this.margin + ')');
  }

  private paths(): void {
    this.svg.append('path')
      .attr('d', `M 100,300 
                  l 0,-200 
                  L 300,200 
                  l 200,-100 
                  L 500,300 
                  C 400,350 400,200 500,300 
                  Z`)
      .attr('stroke', '#000')
      .attr('fill', 'none');
  }

  constructor() { }

  ngOnInit(): void {
    this.createSvg();
    this.paths();

    const events = () => {
      d3.selectAll('path')
        .on('mouseenter', function () {
          d3.select(this)
            .attr('fill', '#0f0');
        })
        .on('mouseleave', function () {
          d3.select(this)
            .attr('fill', 'none');
        })
    }
    events();
  }



}
