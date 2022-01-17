import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-arc-pie-generator',
  templateUrl: './arc-pie-generator.component.html',
  styleUrls: ['./arc-pie-generator.component.scss'],
})
export class ArcPieGeneratorComponent implements OnInit {
  private svg: any;
  private margin = { top: 20, right: 20, bottom: 30, left: 40 };
  private width = 750;
  private height = 450;
  private dataset = [15, 35, 10, 8, 12, 5, 25, 32];
  private colors = d3.schemeSpectral[this.dataset.length]; // serve fazer uma escaça de cor no grafico

  private draw(): void {
    this.svg = d3
      .select('#pie-arc')
      .append('svg')
      .style('background-color', '#F6F8FA')
      .attr('width', this.width)
      .attr('height', this.height);

    const arcGen = d3.arc();
    arcGen.innerRadius(100); // serve para definir o raio interno
    arcGen.outerRadius(160); // serve para definir o raio externo
    // arcGen.startAngle(0); // serve para definir o angulo inicial
    // arcGen.endAngle(Math.PI / 4); // serve para definir o angulo final
    arcGen.cornerRadius(5); // serve para definir o raio da curvatura
    arcGen.padAngle(0.04); // serve para definir o tamanho do angulo
    arcGen.padRadius(50); // serve para definir o raio do angulo

    /*  this.svg
      .append('path')
      .attr('d', arcGen)
      .attr('fill', '#ff0000')
      .attr('stroke', '#000')
      .attr('stroke-width', 2)
      .attr('transform', `translate(${this.width / 2}, ${this.height / 2})`); */

    const pie = d3.pie()(this.dataset); // Declara a função e já passa os dados
    // console.log(pie);

    this.svg
      .selectAll('path')
      .data(pie)
      // .enter()
      .join(
        (enter: any) => enter.append('path').attr('d', arcGen),
        (update: any) => update.attr('d', arcGen),
        (exit: any) => exit.remove()
      )
      // .append('path')
      // .attr('d', arcGen)
      .attr('fill', (d: any, i: any) => this.colors[i])
      .attr('stroke', '#000')
      .attr('transform', `translate(${this.width / 2}, ${this.height / 2})`);

    // pie(this.dataset).forEach((d: any, i: any) => {
    //   console.log(arcGen.centroid(d));
    // })

    // this.svg
    //   .selectAll('circle')
    //   .data(pie(this.dataset))
    //   .enter()
    //   .append('circle')
    //   .attr('cx', (d: any, i: any) => arcGen.centroid(d)[0]) // serve para definir a posição x do centroide
    //   .attr('cy', (d: any, i: any) => arcGen.centroid(d)[1]) // serve para definir a posição y do centroide
    //   .attr('r', 2)
    //   .attr('transform', `translate(${this.width / 2}, ${this.height / 2})`);

    /* this.svg
      .selectAll('text')
      .data(pie)
      .enter()
      .append('text')
      .text((d: any, i: any) => this.dataset[i])
      .attr('x', (d: any, i: any) => arcGen.centroid(d)[0]) // serve para definir a posição x do centroide
      .attr('y', (d: any, i: any) => arcGen.centroid(d)[1]) // serve para definir a posição y do centroide
      .attr('transform', `translate(${this.width / 2}, ${this.height / 2})`)
      .attr('text-anchor', 'middle')
      .attr('font-size', '1.5em')
      .style('pointer-events', 'none'); */

    function initialAnimation(path: any) {
      path.transition()
        .duration(250)
        .attrTween('d', function (d: any) {
          const interpolate = d3.interpolate(d.endAngle, d.startAngle);
          return function (t: any) {
            d.startAngle = interpolate(t);
            return arcGen(d);
          };
        });
    }

    /* function animateSileBack(path: any) {
      path.transition()
        .duration(750)
        .attrTween('d', function (d: any) {
          const interpolate = d3.interpolate(d.startAngle, d.endAngle);
          return function (t: any) {
            d.endAngle = interpolate(t);
            return arcGen(d);
          };
        });
    } */

    function animationSlice (path: any) {
      arcGen
        .innerRadius(120)
        .outerRadius(180)

        d3.selectAll(path)
          .transition()
          .duration(200)
          .attr('d', (d: any) => arcGen(d))
    }

    function animationSliceBack (path: any) {
      arcGen
        .innerRadius(100)
        .outerRadius(160)

        d3.selectAll(path)
          .transition()
          .duration(200)
          .attr('d', (d: any) => arcGen(d))
    }

    d3.selectAll('path')
      .on('mouseover', function (d: any, i: any) {
        const el = d3.select(this);
        animationSlice(el);
      })
      .on('mouseout', function (d: any, i: any) {
        const el = d3.select(this);
        animationSliceBack(el);
      });
    
    const path = d3.selectAll('path');
    initialAnimation(path);
}

  constructor() {}

  ngOnInit(): void {
    this.draw();
  }
}

