import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { randomLcg } from 'd3';

@Component({
  selector: 'app-simulation-challenge',
  templateUrl: './simulation-challenge.component.html',
  styleUrls: ['./simulation-challenge.component.scss']
})
export class SimulationChallengeComponent implements OnInit {
  private svg: any;
  private margin = {top: 20, right: 20, bottom: 20, left: 20};
  private width = 750;
  private height = 400;
  private colors = ['steelblue', 'orange']
  private dataset = d3.range(100).map(() => {
    return {
      r: Math.round(Math.random() * 10) + 5,
      color: this.colors[Math.round(Math.random())]
    }
  });

  private draw(): void {
    this.svg = d3.select('#challenge')
      .append('svg')
      .style('background-color', '#fff')
      .attr('width', this.width)
      .attr('height', this.height)
      .append('g')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);

    d3.select('#challenge').on('click', clicked);

    const simulation = d3.forceSimulation(this.dataset as any);
    const nodes = this.svg
    .append('g')
    .selectAll('circle')
    .data(this.dataset)
    .enter()
    .append('circle')
    .attr('r', (d: any) => d.r)
    .attr('fill', (d: any) => d.color)
    .attr('stroke', '#000');

    simulation.on('tick', ticked as any);

    function ticked (d: any) {
      nodes
        .attr('cx', (d: any) => d.x)
        .attr('cy', (d: any) => d.y)
    };
    console.log(this.margin.left)
    simulation
      .force('yForce', d3.forceY(this.height / 2))
      .force('center', d3.forceX(this.width / 2))
      .force('right', d3.forceX(this.width - this.margin.right).strength(0))
      .force('left', d3.forceX(this.margin.left).strength(0))
      .force('collide', d3.forceCollide().radius((d: any) => d.r));

    // simulation.force('right')?.initialize(this.dataset);

    /* simulation
      .force('right', isolate((d: any) => d.color === 'steelblue', d3.forceX(this.width - this.margin.right)
      .strength(0)));

    simulation
      .force('left', isolate((d: any) => d.color === 'orange', d3.forceX(this.margin.left)
      .strength(0))); */

      simulation.alphaDecay(0.08);
      simulation.velocityDecay(0.2);
      
    let allInCenter = true;
    function clicked () {
      allInCenter = !allInCenter;
      console.log(allInCenter);
    };

    function isolate(filter: any, force: any) {
      let initialize = force.initialize;
      force.initialize = function() {initialize.call(force, this.dataset.filter(filter))};
      return force;
    }
  }

  constructor() { }

  ngOnInit(): void {
    /* d3.csv('https://raw.githubusercontent.com/luizclaudiolc/angular-d3/master/src/data/vaccination/vaccination-data.csv')
      .then((data: any) => {
        console.log(data)
        data.map((d: any) => console.log(d.ISO3))
      }); */
    this.draw();
    console.log(this.dataset)
  }

}
