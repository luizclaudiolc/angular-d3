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

    this.dataset
      .then((data: any) => {
        const nodes = data.nodes;
        const links = data.links;

        console.log({ nodes, links });

        const simulation = d3.forceSimulation()
          .force('link', d3.forceLink().id((d: any) => d.code).distance(5))
          .force('charge', d3.forceManyBody())
          .force('center', d3.forceCenter(this.width / 2, this.height / 2));

        const link = this.svg
          .append('g')
          .selectAll('line')
          .data(links)
          .enter()
          .append('line')
          .attr('stroke', '#000');

        const node = this.svg
          .append('g')
          .selectAll('circle')
          .data(nodes)
          .enter()
          .append('circle')
          .attr('r', 5)
          .call(d3.drag()
            .on('start', draggedStart)
            .on('drag', dragged)
            .on('end', dragEnded));

            const ticked = () => {
              link
              .attr("x1", function(d: any) { return d.source.x; })
              .attr("y1", function(d: any) { return d.source.y; })
              .attr("x2", function(d: any) { return d.target.x; })
              .attr("y2", function(d: any) { return d.target.y; });
              
              node
                .attr("cx", function(d: any) { return d.x; })
                .attr("cy", function(d: any) { return d.y; });
            }

            simulation.nodes(nodes).on('tick', ticked).alphaDecay(0);
            simulation.force('link', d3.forceLink().links(links));

          function draggedStart (d: any, event: any) {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            event.subject.fx = event.subject.x;
            event.subject.fy = event.subject.y;
          }

          function dragged (d: any, event: any) {
            event.subject.fx = event.x;
            event.subject.fy = event.y;            
          }
          
          function dragEnded (event: any) {
            if (!event.active) simulation.alphaTarget(0);
            event.subject.fx = null;
            event.subject.fy = null;
          }
      })
        .catch((e) => console.log(e))
  } 
  constructor() { }

  ngOnInit() {
    this.draw();
  }
}