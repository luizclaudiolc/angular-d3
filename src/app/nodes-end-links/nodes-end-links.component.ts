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
  private width = 850;
  private height = 500;
  private svg: any;

  private dataset = d3.json('https://gist.githubusercontent.com/emanueles/7b7723386677bb13763208216fd89c1f/raw/d09478158ba0fe8aa616deee8bcfe908bba17f15/songs.json');
  
  private draw(): void {
    this.svg = d3.select('#nodes')
    .append('svg')
    .style('background-color', '#f5f5f5')
    .attr('width', this.width)
    .attr('height', this.height)
    .append('g')
    .attr('transform', `translate(${this.margin.left}, ${this.margin.rigth})`);

    this.dataset
      .then((data: any) => {
        const width = this.width;
        const height = this.height;
        const nodes = data.nodes;
        const links = data.links;

        console.log({ nodes, links });

        const simulation = forceSimulation(nodes, links).on('tick', ticked);

        const link = this.svg
        .append('g')
        .selectAll('line')
        .data(links)
        .enter()
        .append('line')
        .attr('stroke', '#000')
        .attr('class', 'link');
        
        const node = this.svg
        .append('g')
        .selectAll('circle')
        .data(nodes)
        .enter()
        .append('circle')
        .attr('r', 5)
        .call(drag(simulation));

        function drag(simmulation: any) {
          const dragstarted = (d: any, event: any) => {
            console.log('Started dragging');
            if (!event.active) simmulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
          };

          const dragged = (d: any, event: any) => {
            console.log('Dragging in progress');
            d.fx = event.x;
            d.fy = event.y;
          };

          const dragended = (d: any, event: any) => {
            console.log('Ended dragging');
            if (!event.active) simmulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
          };

          return d3.drag()
            .on('start', dragstarted)
            .on('drag', dragged)
            .on('end', dragended);
        }

        function forceSimulation (nodes: any, links: any) {
          return d3.forceSimulation(nodes)
            .force('link', d3.forceLink(links).id((d: any) => d.id).distance(25))
            .force('charge', d3.forceManyBody().strength(-50).distanceMax(100))
            .force('center', d3.forceCenter(width / 2, height / 2));
        };
        
        function ticked () {
          link.attr('x1', (d: any) => d.source.x);
          link.attr('y1', (d: any) => d.source.y);
          link.attr('x2', (d: any) => d.target.x);
          link.attr('y2', (d: any) => d.target.y);
          
          node.attr('cx', (d: any) => d.x);
          node.attr('cy', (d: any) => d.y);
        };

        function circleScale(t: any) {
          return d3.scaleSqrt()
            .domain([Number(d3.extent(t.nodes, (d: any) => d.playcount))])
            .range([2, 20]);
        }
      })
        .catch((e) => console.log(e))
  } 
  constructor() { }

  ngOnInit() {
    this.draw();
  }
}