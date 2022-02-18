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
  private margin = { top: 50, bottom: 50, left: 70, right: 20 };
  private dataset = d3.json('https://raw.githubusercontent.com/luizclaudiolc/angular-d3/master/src/data/data-team/data.json');

  private streamChartDraw(): void {
    this.dataset.then((d) => mainData(d));

    this.svg = d3.select('#stream')
      .append('svg')
      // .style('background-color', '#FAF6F8')
      .attr('width', this.width)
      .attr('height', this.height);

    const pathContainer = this.svg.append('g');
    const legendContainer = this.svg.append('g');
    const xAxisContainer = this.svg.append('g')
      .attr('id', 'xAxis')
      .attr('transform', `translate(0, ${this.height - this.margin.bottom})`);

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
      .domain([minValue, maxValue] as Array<number>)
      .range([this.height - this.margin.bottom, this.margin.top]);

    const colors = d3.schemePastel2;

    const axis = d3.axisBottom(scaleX)
    axis.ticks(data.length)
      .tickFormat((d: any) => `CW${d}`)
      .tickSize(-this.height + this.margin.top + this.margin.bottom);
    
    
    
    xAxisContainer.call(axis)
      .call((g: any) => g.select('.domain').remove()) // serve para remover o eixo do domínio
      .selectAll('line')
      .attr('stroke', '#777')
      .attr('stroke-dasharray', '5,2')
      .attr('stroke-opacity', 0.5);


    const area = d3.area()
      .x((d: any, i: number) => scaleX(i))
      .y0(d => scaleY(d[0]))
      .y1(d => scaleY(d[1]))
      .curve(d3.curveCatmullRomOpen);

    const markes = this.svg.selectAll('circle')
      .data(d3.range(stackData.length + 1))
      .join(
        (enter: any) => enter.append('circle'),
        (update: any) => update,
        (exit: any) => exit.remove()
      )
      .attr('fill', 'transparent')
      .attr('r', 5)
      .attr('cx', 10)
      .attr('cy', 10)

    const updateLabels = (event: any) => {
      const ix = Math.round(scaleX.invert(event.x));
      const text = Object.keys(data[ix]);
      console.log(ix);
      const markersNodes = d3.selectAll('circle').nodes();
      
      for (let i = 0; i < text.length; i++) {
          d3.select(`#label-${text[i]}`)
            .text(`${text[i]}: ${data[ix][text[i]]}`)
        
          // markers update
          d3.select(markersNodes[i])
            .attr('cx', scaleX(ix))
            .attr('cy', scaleY(stackData[i][ix][0]))
            .attr('fill', 'orange')
      };

      d3.select(markersNodes[text.length])
        .attr('cx', scaleX(ix))
        .attr('cy', scaleY(stackData[0][ix][1]));
    };

    const resetLabels = (event: any) => {
      const markersNodes = d3.selectAll('circle').nodes();
      const text = Object.keys(data[0]);
      for (let i of text) {
        d3.select(`#label-${i}`)
        .text(`${i}`);
      };

      d3.selectAll(markersNodes)
        .transition()
        .duration(500)
        .attr('fill', 'transparent');
    };

    const paths = pathContainer.selectAll('path')
      .data(stackData)
      .join(
        (enter: any) => enter.append('path'),
        (update: any) => update,
        (exit: any) => exit.remove()
      )
      .on('mousemove', updateLabels)
      .on('mouseleave', resetLabels)
      .transition()
      .duration(1000)
      .attr('d', area)
      .attr('stroke', '#cece')
      .attr('fill', (d: any, i: number) => colors[i])
      .attr('fill-opacity', 0.75)
      .attr('id', (d: any, i: number) => `path-${Object.keys(data[0])[i]}`);


      const rect = legendContainer.selectAll('rect')
      .data(Object.keys(data[0]))
      .join(
        (enter: any) => enter.append('rect'),
        (update: any) => update,
        (exit: any) => exit.remove()
      )
      .attr('width', 15)
      .attr('height', 15)
      .attr('stroke', '#cece')
      .attr('fill', (d: any, i: number) => colors[i])
      .attr('fill-opacity', 0.75)
      .attr('x', 20)
      .attr('y', (d: any, i: number) => (this.height / 2) / 2 + i * 25);

      const legend = legendContainer.selectAll('text')
      .data(Object.keys(data[0]))
      .join(
        (enter: any) => enter.append('text'),
        (update: any) => update,
        (exit: any) => exit.remove()
      )
      .attr('fill', 'gray')
      .attr('alignment-baseline', 'hanging')
      .attr('x', 40)
      .attr('y', (d: any, i: number) => (this.height / 2) / 2 + i * 25)
      .text((d: any) => d)
      .attr('class', 'label')
      .attr('id', (d: any, i: any) => `label-${d}`);
      
      // legend.text((d: any) => d);
    };
  };


  constructor() { }

  ngOnInit(): void {
    this.streamChartDraw()
    // this.dataset.then((team) => console.log(team))
  }

}
