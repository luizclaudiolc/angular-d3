import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { GenerateUuidService } from 'src/utils/generate-uuid.service';

@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.scss']
})
export class PieComponent implements OnInit {
  constructor(@Inject (DOCUMENT) private document: Document,
    private makeId: GenerateUuidService) { }

  data = [
    {"Framework": "Vue", "Stars": "166443", "Released": "2014"},
    {"Framework": "React", "Stars": "150793", "Released": "2013"},
    {"Framework": "Angular", "Stars": "62342", "Released": "2016"},
    {"Framework": "Backbone", "Stars": "27647", "Released": "2010"},
    {"Framework": "Ember", "Stars": "21471", "Released": "2011"},
    {"Framework": "Redux", "Stars": "28481", "Released": "2019"},
  ];

  svg: any;
  margin = { top: 30, right: 30, bottom: 30, left: 40 };
  width = 750;
  height = 450;
  arcGen: any;
  colors = d3.schemeGreens[this.data.length]; // serve para definir a cor do grafico
  id?: string;

  ngOnInit(): void {
    this.id = this.makeId.generateUuid();
    this.createSvg();
    this.update();
    this.eventsAnimations();
  }

  createSvg(): void {
    this.svg = d3.select('#pie')
      .append('svg')
      // .style('background-color', '#F6F8FA')
      .attr('width', this.width)
      .attr('height', this.height)
      .attr('id', `svg-${this.id}`);

    d3.select(`svg#svg-${this.id}`).append('g').attr('id', `g-${this.id}-path`)
      .attr('transform', `translate(${this.width / 2}, ${this.height / 2})`);
    d3.select(`svg#svg-${this.id}`).append('g').attr('id', `g-${this.id}-label`)
      .attr('transform', `translate(${this.width / 2}, ${this.height / 2})`);
  };

  update(): void {
    if (!this.data.length) {
      d3.select(`svg#svg-${this.id}`)
        .append('text')
        .attr('x', this.width / 2)
        .attr('y', this.height / 2)
        .attr('text-anchor', 'middle')
        .style('font-size', '20px')
        .style('font-weight', 'bold')
        .text('Nenhum dado encontrado...');
      return;
    };

    // *** update svg dimensions *** //
    d3.select(`svg#svg-${this.id}`)
      .attr('width', this.width)
      .attr('height', this.height);

    // *** create arc generator *** //
    this.arcGen = d3.arc()
      .innerRadius(100)
      .outerRadius(200)
      .padAngle(0.05)
      .padRadius(50)
      .cornerRadius(5);

    const pie = d3.pie()(this.data.map(d => +d.Stars));

    d3.select(`#g-${this.id}-path`)
      .selectAll('path')
      .data(pie)
      .join(
        enter => enter.append('path'),
        update => update,
        exit => exit.remove()
      )
      .attr('d', this.arcGen)
      .attr('fill', (d, i) => this.colors[i])
      .attr('stroke', '#000')
      .attr('stroke-width', 0.75)
      .attr('id', (d: any, i: any) => `path-${this.id}-${i}`);

    d3.select(`#g-${this.id}-label`)
      .selectAll('text')
      .data(pie)
      .join(
        enter => enter.append('text'),
        update => update,
        exit => exit.remove()
      )
      .text((d, i) => this.data[i].Framework)
      .attr('x', (d, i) => this.arcGen.centroid(d)[0])
      .attr('y', (d, i) => this.arcGen.centroid(d)[1])
      .attr('text-anchor', 'middle')
      .attr('fill', '#000')
      .attr('font-size', '12px')
      .attr('id', (d: any, i: any) => `label-${this.id}-${i}`);
  };

  eventsAnimations(): void {
    const animateSlice = (id: any) => {
      this.arcGen
        .innerRadius(120)
        .outerRadius(220);

        id.transition()
          .duration(350)
          .attr('d', (d: any) => this.arcGen(d));
    };

    const animateSliceBack = (id: any) => {
      this.arcGen
        .innerRadius(100)
        .outerRadius(200);

        id.transition()
          .duration(350)
          .attr('d', (d: any) => this.arcGen(d));
    };

    d3.select(`#g-${this.id}-path`)
      .selectAll('path')
      .on('mouseover', (event: any) => animateSlice(d3.select(`#${event.target.id}`)))
      .on('mouseout', (event: any) => animateSliceBack(d3.select(`#${event.target.id}`)));
      
  };
}