import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-stream-chart',
  templateUrl: './stream-chart.component.html',
  styleUrls: ['./stream-chart.component.scss']
})
export class StreamChartComponent implements OnInit {
  private svg: any;
  private width = 770;
  private height = 500;
  private margin = { top: 50, bottom: 50, left: 100, right: 20 };
  private dataset = d3.json('https://raw.githubusercontent.com/luizclaudiolc/angular-d3/master/src/data/data-team/data.json');

  private streamChartDraw(): void {
    this.dataset.then((d) => mainData(d));

    this.svg = d3.select('#stream')
      .append('svg')
      .style('background-color', '#FAF6F8')
      .attr('width', this.width)
      .attr('height', this.height);

    const pathCotainer = this.svg.append('g');

      const menuSelect = d3.select('#stream')
        .append('select');

      function mainData(dataset: any) {
        const options = menuSelect.selectAll('options')
          .data(Object.keys(dataset))
          .join(
            enter => enter.append('option'),
            update => update,
            exit => exit.remove()
          )
          .attr('value', d => d)
          .text(d => d);

        menuSelect.on('change', () => {
          changeDraw(dataset[menuSelect.select('option:checked').text()]);
        });

        changeDraw(dataset[menuSelect.select('option:checked').text()]);
      };

      const changeDraw =  (data: any) => {
        console.log(data);

        const stack = d3.stack().keys(Object.keys(data[0]))
          .order(d3.stackOrderReverse)
          .offset(d3.stackOffsetSilhouette);

        const stackData = stack(data);
        
        const minValue = d3.min(stackData, d => d3.min(d, d => d3.min(d)));
        const maxValue = d3.max(stackData, d => d3.max(d, d => d3.max(d)));

        const scaleX = d3.scaleLinear()
          .domain([0, data.length -1])
          .range([this.margin.left, this.width - this.margin.right]);

        const scaleY = d3.scaleLinear()
          .domain([minValue, maxValue] as [number, number])
          .range([this.margin.bottom, this.height - this.margin.top]);

        const colors = d3.schemePastel2;

        const area = d3.area()
          .x((d: any, i: number) => scaleX(i))
          .y0(d => scaleY(d[0]))
          .y1(d => scaleY(d[1]))
          .curve(d3.curveCatmullRomOpen);

        const paths = pathCotainer.selectAll('path')
          .data(stackData)
          .join(
            (enter: any) => enter.append('path'),
            (update: any) => update,
            (exit: any) => exit.remove()
          )
          .transition()
          .duration(1000)
          .attr('d', area)
          .attr('stroke', '#cece')
          .attr('fill', (d: any, i: number) => colors[i])
          .attr('fill-opacity', 0.75)
          .attr('id', (d: any, i: number) => `path-${Object.keys(data[0])[i]}`);
      };
  };


  constructor() { }

  ngOnInit(): void {
    this.streamChartDraw()
    // this.dataset.then((team) => console.log(team))
  }

}
