import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { GenerateUuidService } from 'src/utils/generate-uuid.service';

@Component({
  selector: 'app-stacks-component',
  templateUrl: './stacks-component.component.html',
  styleUrls: ['./stacks-component.component.scss']
})
export class StacksComponentComponent implements OnInit {
  svg: any;
  margin = {top: 20, right: 20, bottom: 20, left: 40};
  width = 750;
  height = 400;
  dataset = [
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

  scaleX: any;
  scaleY: any;
  stack: any;
  stackData: any;
  area: any;
  minValue: any;
  maxValue: any;
  colors = d3.schemeOranges[9];
  id?: string;

  constructor(private makeId: GenerateUuidService) { }

  ngOnInit(): void {
    this.drawSvg();
    this.update();
    this.appendText();
    this.id = this.makeId.generateUuid();
  }

  drawSvg(): void {
    this.svg = this.svg = d3.select('#stacks')
      .append('svg')
      // .style('background-color', '#F6F8FA')
      .attr('width', this.width)
      .attr('height', this.height)
      .attr('id', 'stacks-svg');

    d3.select('svg#stacks-svg').append('g').attr('id', 'stacks-g-path');
    d3.select('svg#stacks-svg').append('g').attr('id', 'stacks-g-text-order');
    d3.select('svg#stacks-svg').append('g').attr('id', 'stacks-g-text-offset');
    d3.select('svg#stacks-svg').append('g').attr('id', 'stacks-g-axis-bottom');
    d3.select('svg#stacks-svg').append('g').attr('id', 'stacks-g-axis-left');
  };

  update(): void {
    if (!this.dataset.length) return;

    // *** update svg *** //
    d3.select('svg#stacks-svg')
      .attr('width', this.width)
      .attr('height', this.height);

    // *** create Stacks *** //
    const keys = Object.keys(this.dataset[0]);
    this.stack = d3.stack().keys(keys);
    this.stackData = this.stack(this.dataset);

    // *** create Max and Min values *** //
    this.minValue = d3.min(this.stackData, d => d3.min(d as Array<number>,
      d => d3.min(d as any)));
    this.maxValue = d3.max(this.stackData, d => d3.max(d as Array<number>,
      d => d3.max(d as any)));
  
    // *** create scales *** //
    this.scaleX = d3.scaleLinear()
      .domain([0, this.stackData[0].length - 1])
      .range([this.margin.left, this.width - this.margin.right]);

    this.scaleY = d3.scaleLinear()
      .domain([this.minValue, this.maxValue])
      .range([this.height - this.margin.bottom, this.margin.top]);

    // *** create area *** //
    this.area = d3.area()
      .x((d: any, i: any) => this.scaleX(i))
      .y0((d: any) => this.scaleY(d[0]))
      .y1((d: any) => this.scaleY(d[1]))
      .curve(d3.curveBasis);

    // *** create path *** //
    d3.select('g#stacks-g-path')
      .selectAll('path')
      .data(this.stackData)
      .join(
        enter => enter.append('path'),
        update => update,
        exit => exit.remove()
      )
      .attr('d', (d: any) => this.area(d))
      .attr('fill', (d: any, i: any) => this.colors[i])
      .attr('stroke', 'silver')
      .attr('stroke-width', 1);

    /* // *** create axis bottom *** //
    const axisBottom = d3.axisBottom(this.scaleX);

    d3.select('g#stacks-g-axis-bottom')
      .attr('transform', `translate(0, ${this.height - this.margin.bottom})`)
      .call(axisBottom as any); */

    // *** create axis left *** //
    const axisLeft = d3.axisLeft(this.scaleY)
      .tickSize(-this.width + this.margin.left + this.margin.right)
      .tickSizeOuter(0)
      .tickPadding(5);

    d3.select('g#stacks-g-axis-left')
      .attr('transform', `translate(${this.margin.left}, 0)`)
      .call(axisLeft as any);

    d3.select('g#stacks-g-axis-left')
      .selectAll('line')
      .attr('stroke-dasharray', '3,10')
      .attr('stroke-dashoffset', 1000)
      .transition()
      .delay((d: any, i: any) => i * 50)
      .duration(500)
      .ease(d3.easeExpIn)
      .attr('stroke-dashoffset', 0)
      .attr('stroke-opacity', 0.5);

    d3.select('g#stacks-g-axis-left')
      .selectAll('.domain')
      .remove();
  };

  appendText(): void {
    // *** create text Order *** //
    const nextOrder = () => {
      const currentText = d3.select('#stacks-g-text-order').selectAll('text').text();
      const nextOrder = (next: string) => d3.select('#stacks-g-text-order').selectAll('text').text(next);
      const key = Object.keys(this.dataset[0]);

        if (currentText === 'Order') {
          nextOrder('d3.stackOrderAppearance');
          this.stack = d3.stack().keys(key).order(d3.stackOrderAppearance);
        };

        if (currentText === 'd3.stackOrderAppearance') {
          nextOrder('d3.stackOrderNone');
          this.stack = d3.stack().keys(key).order(d3.stackOrderNone);
        };

        if (currentText === 'd3.stackOrderNone') {
          nextOrder('d3.stackOrderReverse');
          this.stack = d3.stack().keys(key).order(d3.stackOrderReverse);
        };

        if (currentText === 'd3.stackOrderReverse') {
          nextOrder('d3.stackOrderInsideOut');
          this.stack = d3.stack().keys(key).order(d3.stackOrderInsideOut);
        };

        if (currentText === 'd3.stackOrderInsideOut') {
          nextOrder('Order');
          this.stack = d3.stack().keys(key).order(d3.stackOrderNone);
        };

        this.stackData = this.stack(this.dataset);
        this.minValue = d3.min(this.stackData, d => d3.min(d as Array<number>, d => d3.min(d as any)));
        this.maxValue = d3.max(this.stackData, d => d3.max(d as Array<number>, d => d3.max(d as any)));

        this.scaleX = d3.scaleLinear()
          .domain([0, this.stackData[0].length - 1])
          .range([this.margin.left, this.width - this.margin.right]);
          
        this.scaleY = d3.scaleLinear()
          .domain([this.minValue, this.maxValue])
          .range([this.height - this.margin.bottom, this.margin.top + 20]);

        d3.select('g#stacks-g-path')
          .selectAll('path')
          .data(this.stackData)
          .transition()
          .duration(1000)
          .attr('d', (d: any) => this.area(d));
    };

    // *** create text Offset *** //
    const nextOffset = () => {
      const currentText = d3.select('#stacks-g-text-offset').selectAll('text').text();
      const nextOffset = (next: string) => d3.select('#stacks-g-text-offset').selectAll('text').text(next);
      const key = Object.keys(this.dataset[0]);
      console.log(currentText);

        if (currentText === 'Offset') {
          nextOffset('d3.stackOffsetWiggle');
          this.stack = d3.stack().keys(key).offset(d3.stackOffsetWiggle);
        };

        if (currentText === 'd3.stackOffsetWiggle') {
          nextOffset('d3.stackOffsetExpand');
          this.stack = d3.stack().keys(key).offset(d3.stackOffsetExpand);
        };

        if (currentText === 'd3.stackOffsetExpand') {
          nextOffset('d3.stackOffsetDiverging');
          this.stack = d3.stack().keys(key).offset(d3.stackOffsetDiverging);
        };

        if (currentText === 'd3.stackOffsetDiverging') {
          nextOffset('d3.stackOffsetNone');
          this.stack = d3.stack().keys(key).offset(d3.stackOffsetNone);
        };

        if (currentText === 'd3.stackOffsetNone') {
          nextOffset('d3.stackOffsetSilhouette');
          this.stack = d3.stack().keys(key).offset(d3.stackOffsetSilhouette);
        };

        if (currentText === 'd3.stackOffsetSilhouette') {
          nextOffset('Offset');
          this.stack = d3.stack().keys(key).offset(d3.stackOffsetNone);
        };

        this.stackData = this.stack(this.dataset);
        this.minValue = d3.min(this.stackData, d => d3.min(d as Array<number>, d => d3.min(d as any)));
        this.maxValue = d3.max(this.stackData, d => d3.max(d as Array<number>, d => d3.max(d as any)));

        this.scaleX = d3.scaleLinear()
          .domain([0, this.stackData[0].length - 1])
          .range([this.margin.left, this.width - this.margin.right]);

        this.scaleY = d3.scaleLinear()
          .domain([this.minValue, this.maxValue])
          .range([this.height - this.margin.bottom, this.margin.top + 20]);

        d3.select('g#stacks-g-path')
          .selectAll('path')
          .data(this.stackData)
          .transition()
          .duration(1000)
          .attr('d', (d: any) => this.area(d));
    };

    // *** create text Order *** //
    d3.select('#stacks-g-text-order')
      .append('text')
      .attr('x', this.margin.left + 10)
      .attr('y', this.margin.top)
      .attr('alignment-baseline', 'middle')
      .attr('text-anchor', 'start')
      .text('Order')
      .style('cursor', 'pointer')
      .on('click', nextOrder);

    // *** create text Offset *** //
    d3.select('#stacks-g-text-offset')
      .append('text')
      .attr('x', this.width - this.margin.right - 10)
      .attr('y', this.margin.top)
      .attr('alignment-baseline', 'middle')
      .attr('text-anchor', 'end')
      .text('Offset')
      .style('cursor', 'pointer')
      .on('click', nextOffset);
  };
}
