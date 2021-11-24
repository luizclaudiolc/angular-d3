import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-shapes',
  templateUrl: './shapes.component.html',
  styleUrls: ['./shapes.component.scss']
})
export class ShapesComponent implements OnInit {
  private svg: any;
  private margin = 50;
  private width = 750 - (this.margin * 2);
  private height = 400 - (this.margin * 2);
  private points = '20,150 70,250 110,200 110,250';
  private pointsPolyLine = '170,150 220,250 260,200 260,250';
  
  private createSvg(): void {
    this.svg = d3.select('#shapes')
      .append('svg')
      .attr('width', this.width + (this.margin * 2))
      .attr('height', this.height + (this.margin * 2))
      .append('g')
      .attr('transform', 'translate(' + this.margin + ',' + this.margin + ')');
  }

  private createCircle(): void {
    this.svg.append('circle')
      .attr('cx', 50)
      .attr('cy', 20)
      .attr('r', 15)
      .style('fill', '#f0f');
  }

  private createEllipse(): void {
    this.svg.append('ellipse')
      .attr('cx', 150)
      .attr('cy', 40)
      .attr('rx', 60)
      .attr('ry', 30)
      .style('fill', '#0ac');
  }

  private createLine(): void {
    this.svg.append('line')
      .attr('x1', 250)
      .attr('y1', 100)
      .attr('x2', 350)
      .attr('y2', 25)
      // .style('fill', '#0f0')
      .style('stroke', 'black');
  }

  private createPolygon(): void {
    this.svg.append('polygon')
      .attr('points', this.points)
      .attr('stroke', '#000')
      .attr('fill', 'none');
  }

  private createPolylin(): void {
    this.svg.append('polyline')
      .attr('points', this.pointsPolyLine)
      .attr('stroke', '#000')
      .attr('fill', 'none');
  }

  private createRect(): void {
    this.svg.append('rect')
      .attr('x', 400)
      .attr('y', 150)
      .attr('width', 100)
      .attr('height', 100)
      // .attr('rx', 5)
      .attr('stroke', 'black');
  }


  constructor() { }

  ngOnInit(): void {
    this.createSvg();
    this.createCircle();
    this.createEllipse();
    this.createLine();
    this.createPolygon();
    this.createPolylin();
    this.createRect();

    d3.selectAll('rect')
      .on('mouseenter', function () {
        console.log('aqui...')
        d3.select(this)
          .attr('stroke', 'red')
          .style('fill', 'none')
      })
      .on('mouseleave', function() {
        d3.select(this)
          .attr('stroke', '#000')
          .style('fill', '#000')
      })
  }

}
