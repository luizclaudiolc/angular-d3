import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-stacks-component',
  templateUrl: './stacks-component.component.html',
  styleUrls: ['./stacks-component.component.scss']
})
export class StacksComponentComponent implements OnInit {
    private svg: any;
    private margin = {top: 20, right: 40, bottom: 30, left: 40};
    private width = 750;
    private height = 400;
    private dataset = [
      {a: 40, b: 30, c: 10, d: 50},
      {a: 45, b: 31, c: 10, d: 50},
      {a: 42, b: 34, c: 0, d: 0},
      {a: 38, b: 29, c: 15, d: 40},
      {a: 21, b: 25, c: 20, d: 52},
      {a: 40, b: 12, c: 18, d: 4},
      {a: 30, b: 0, c: 16, d: 38},
      {a: 35, b: 22, c: 22, d: 45},
      {a: 35, b: 28, c: 64, d: 42},
      {a: 36, b: 34, c: 30, d: 41},
  ];

    private drawStacks(): void {
      this.svg = d3.select('#stacks')
        .append('svg')
        .style('background-color', '#F6F8FA')
        .attr('width', this.width)
        .attr('height', this.height);

      const stack = d3.stack().keys(['a', 'b', 'c', 'd']);
      let stackData = stack(this.dataset);
      // console.log(stackData);

      let minValue = d3.min(stackData, d => d3.min(d, d => d3.min(d)));
      let maxValue = d3.max(stackData, d => d3.max(d, d => d3.max(d)));
      // console.log({ minValue, maxValue});

      let scaleX = d3.scaleLinear()
        .domain([0, 9])
        .range([this.margin.left, this.width - this.margin.right]);

      let scaleY = d3.scaleLinear()
        .domain([minValue, maxValue] as [number, number])
        .range([this.height - this.margin.bottom, this.margin.top]);

      const colors = d3.schemeYlGn[stackData.length];

      const area = d3.area()
        .x((d: any, i: any) => scaleX(i))
        .y0(d => scaleY(d[0]))
        .y1(d => scaleY(d[1]))
        .curve(d3.curveNatural)

      this.svg
        .selectAll('path')
        .data(stackData)
        .join(
          (enter: any) => enter.append('path'),
          (update: any) => update.append('path'),
          (exit: any) => exit.remove()
        )
        .attr('stroke', '#000')
        .attr('fill', (d: any, i: any) => colors[i])
        .attr('d', area);

      const stackOrdersFunc = () => {
        if (order.text() === 'Order') {
          order.text('d3.stackOrderAppearance');
          stack.order(d3.stackOrderAppearance);
        } else if (order.text() === 'd3.stackOrderAppearance') {
          order.text('d3.stackOrderAscending');
          stack.order(d3.stackOrderAscending);
        } else if (order.text() === 'd3.stackOrderAscending') {
          order.text('d3.stackOrderDescending');
          stack.order(d3.stackOrderDescending);
        } else if (order.text() === 'd3.stackOrderDescending') {
          order.text('d3.stackOrderInsideOut');
          stack.order(d3.stackOrderInsideOut);
        } else if (order.text() === 'd3.stackOrderInsideOut') {
          order.text('d3.stackOrderNone');
          stack.order(d3.stackOrderNone);
        } else if (order.text() === 'd3.stackOrderNone') {
          order.text('d3.stackOrderReverse');
          stack.order(d3.stackOrderReverse);
        } else if (order.text() === 'd3.stackOrderReverse') {
          order.text('d3.stackOrderAppearance');
          stack.order(d3.stackOrderAppearance);
        }

        stackData = stack(this.dataset);
        minValue = d3.min(stackData, d => d3.min(d, d => d3.min(d)));
        maxValue = d3.max(stackData, d => d3.max(d, d => d3.max(d)));
        scaleX = d3.scaleLinear()
          .domain([0, 9])
          .range([this.margin.left, this.width - this.margin.right]);

        scaleY = d3.scaleLinear()
          .domain([minValue, maxValue] as [number, number])
          .range([this.height - this.margin.bottom, this.margin.top + 20]);

        this.svg.selectAll('path')
          .data(stackData)
          .transition()
          .duration(450)
          .attr('d', area);
      }

      const offsetFunc = () => {
        if (offset.text() == 'Offset') {
          offset.text('d3.stackOffsetExpand')
          stack.offset(d3.stackOffsetExpand)
      } else if (offset.text() == 'd3.stackOffsetExpand') {
          offset.text('d3.stackOffsetDiverging')
          stack.offset(d3.stackOffsetDiverging)
      } else if (offset.text() == 'd3.stackOffsetDiverging') {
          offset.text('d3.stackOffsetNone')
          stack.offset(d3.stackOffsetNone)
      } else if (offset.text() == 'd3.stackOffsetNone') {
          offset.text('d3.stackOffsetSilhouette')
          stack.offset(d3.stackOffsetSilhouette)
      } else if (offset.text() == 'd3.stackOffsetSilhouette') {
          offset.text('d3.stackOffsetWiggle')
          stack.offset(d3.stackOffsetWiggle)
      } else if (offset.text() == 'd3.stackOffsetWiggle') {
          offset.text('d3.stackOffsetExpand')
          stack.offset(d3.stackOffsetExpand)
      };

        stackData = stack(this.dataset);
        console.log(stackData);
        minValue = d3.min(stackData, d => d3.min(d, d => d3.min(d)));
        maxValue = d3.max(stackData, d => d3.max(d, d => d3.max(d)));
        scaleX = d3.scaleLinear()
          .domain([0, 9])
          .range([this.margin.left, this.width - this.margin.right]);

        scaleY = d3.scaleLinear()
          .domain([minValue, maxValue] as [number, number])
          .range([this.height - this.margin.bottom, this.margin.top + 20]);

        this.svg.selectAll('path')
          .data(stackData)
          .transition()
          .duration(450)
          .attr('d', area);
      }

      const btnOrder = this.svg.append('g')
        .append('rect')
        .attr('x', this.margin.left)
        .attr('y', this.margin.top - 10)
        .attr('width', this.margin.left + 180)
        .attr('height', 20)
        .attr('fill', (d: any, i: any) => colors[i])
        .attr('stroke', '#000')
        .style('cursor', 'pointer')
        .on('click', stackOrdersFunc)
        .on('mouseenter', () => btnOrder
          .transition()
          .duration(250)
          .attr('fill', (d: any, i: any) => colors[i + 1]))
        .on('mouseleave', () => btnOrder
          .transition()
          .duration(250)
          .attr('fill', (d: any, i: any) => colors[i]));

      const order = this.svg
        .append('text')
        .attr('x', this.margin.left + 10)
        .attr('y', this.margin.top)
        .attr('alignment-baseline', 'middle')
        .attr('text-anchor', 'start')
        .style('cursor', 'pointer')
        .text('Order')
        .on('click', stackOrdersFunc)
        .on('mouseenter', () => btnOrder
          .transition()
          .duration(250)
          .attr('fill', (d: any, i: any) => colors[i + 1]))
        .on('mouseleave', () => btnOrder
        .transition()
        .duration(250)
        .attr('fill', (d: any, i: any) => colors[i]));

      const offset = this.svg
        .append('text')
        .attr('x', this.width - this.margin.right - 200)
        .attr('y', this.margin.top)
        .attr('alignment-baseline', 'middle')
        .style('cursor', 'pointer')
        .text('Offset')
        .on('click', offsetFunc)
        .on('mouseenter', () => {
          offset.transition()
            .duration(250)
            .attr('fill', 'darkorange')
        })
        .on('mouseleave', () => {
          offset.transition()
            .duration(0.75)
            .attr('fill', '#000')
        })
        .on('mousedown', () => {
          offset.transition()
            .duration(0.75)
            .attr('x', this.width - this.margin.right - 200 + 10)
        })
        .on('mouseup', () => {
          offset.transition()
            .duration(250)
            .attr('x', this.width - this.margin.right - 200)
        });
    };

  constructor() { }

  ngOnInit(): void {
    this.drawStacks();
    console.log(this.dataset);
  }

}
