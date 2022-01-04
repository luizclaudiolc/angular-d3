import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { drag, forceSimulation } from 'd3';

@Component({
  selector: 'app-nodes-end-links',
  templateUrl: './nodes-end-links.component.html',
  styleUrls: ['./nodes-end-links.component.scss']
})
export class NodesEndLinksComponent implements OnInit {
  private margin = { top: 40, bottom: 40, left: 20, rigth: 20};
  private width = 750;
  private height = 400;
  private svg: any;

  private dataset = d3.json('https://raw.githubusercontent.com/DealPete/forceDirected/master/countries.json');
  
  private draw(): void {
    this.svg = d3.select('#nodes')
    .append('svg')
    .style('background-color', '#f5f5f5')
    .attr('width', this.width)
    .attr('height', this.height)
    .append('g')
    .attr('transform', `translate(${this.margin.left}, ${this.margin.rigth})`);
    
    this.svg.append('g').attr('class', 'links');
    this.svg.append('g').attr('class', 'nodes');
    
    const tooltip = d3.select('#flags')
      .append('div')
      .style('position', 'absolute')
      .style('opacity', 0)
      .style('background-color', 'white')
      .style('border', 'solid')
      .style('border-width', '2px')
      .style('border-radius', '5px');
    
    this.dataset
      .then((data: any) => {
        console.log(data);
        const nodes = data.nodes;
        const links = data.links;

        const ticked = () => {
          updateLinks();
          updateNodes();
        }

        const force = d3.forceSimulation(nodes)
          .force('charge', d3.forceManyBody().strength(-5))
          .force('center', d3.forceCenter(this.width / 2, this.height / 2))
          .force('link', d3.forceLink().links(links).distance(15))
          .on('tick', ticked);

          const updateLinks = () => {
            const link = d3.select('.links')
              .selectAll('line')
              .data(links)
              .join('line')
              .attr('stroke', '#999')
              .attr('stroke-width', 1)
              .attr('x1', (d: any) => d.source.x)
              .attr('y1', (d: any) => d.source.y)
              .attr('x2', (d: any) => d.target.x)
              .attr('y2', (d: any) => d.target.y)
          }
  
          const updateNodes = () => {
            const node = d3.select('.nodes')
              .selectAll('circle')
              .data(nodes)
              .join('circle')
              .attr('r', 5)
              .attr('fill', '#ff0000')
              .attr('stroke', '#fff')
              .attr('stroke-width', 1)
              .attr('cx', (d: any) => d.x)
              .attr('cy', (d: any) => d.y);
          }

          const drag = d3.drag();

          drag.on('start', (event: any, d: any) => {
            console.log('drag start');
          })
          drag.on('drag', (event: any, d: any) => {
            console.log('drag');
          })
          drag.on('end', (event: any, d: any) => {
            console.log('drag end');
          })

      }).catch(error => {
        console.log(error);
      });
  } 
  constructor() { }

  ngOnInit() {
    this.draw();
  }
}