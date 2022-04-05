import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-zoom',
  templateUrl: './zoom.component.html',
  styleUrls: ['./zoom.component.scss']
})
export class ZoomComponent implements OnInit {
  svg: any;
  width = 750;
  height = 400;
  margins = { top: 20, right: 20, bottom: 30, left: 30 };
  scaleX: any;
  scaleY: any;
  axisX: any;
  axisY: any;
  data = Array.from({ length: 10 }, () => [Math.floor(Math.random() * 50),
    Math.floor(Math.random() * 50)]);
  z = d3.zoomIdentity; // z mantém uma cópia da transformação anterior, para que possamos rastrear suas alterações

  constructor() { }

  ngOnInit(): void {
    console.log(this.data);
    
    this.svg = d3.select('#zoom')
      .append('svg')
      // .style('background', '#cececc')
      .attr('width', this.width)
      .attr('height', this.height)
      .attr('id', 'svg-zoom');

    this.scaleX = d3.scaleLinear()
      .domain(d3.extent(this.data, d => d[0]) as Array<number>)
      .range([this.margins.left, this.width - this.margins.right])
      .nice();

    this.scaleY = d3.scaleLinear()
      .domain(d3.extent(this.data, d => d[1]) as Array<number>)
      .range([this.height - this.margins.bottom, this.margins.top])
      .nice();

    this.axisX = (g: any, scale: any) => {
      g.attr('transform', `translate(0,${this.height - this.margins.bottom})`)
        .call(d3.axisBottom(scale).ticks(10 * this.width / this.height))
        .call((g: any) => g.select('.domain').attr('display', 'none'));
    }

    this.axisY = (g: any, scale: any) => {
      g.attr('transform', `translate(${this.margins.left},0)`)
        .call(d3.axisLeft(scale).ticks(10 * this.height / this.width))
        .call((g: any) => g.select('.domain').attr('display', 'none'));
    }

    const vo = this.svg.append('path');
    const gx = this.svg.append('g');
    const gy = this.svg.append('g');

    const dots = this.svg.append('g')
      .selectAll('circle')
      .data(this.data)
      .join('circle')
      /* .attr('cx', (d: any) => this.scaleX(d[0]))
      .attr('cy', (d: any) => this.scaleY(d[1]))
      .attr('r', 2) */
      .attr('fill', () => d3.schemeGreens[9][Math.floor(Math.random() * 9) | 0]);

    // configura os zooms auxiliares e um acessador para sua transformação
    const zoomX = d3.zoom().scaleExtent([0.1, 10]);
    const zoomY = d3.zoom().scaleExtent([0.2, 5]);
    const tx = () => d3.zoomTransform(gx.node());
    const ty = () => d3.zoomTransform(gy.node());
    gx.call(zoomX).attr('pointer-events', 'none');
    gy.call(zoomY).attr('pointer-events', 'none');

    // center the action (handles multitouch)
    const center = (event: any, target: any) => {
      if (event.sourceEvent) {
        const point = d3.pointers(event, target);
        return [d3.mean(point, (d: any) => d[0]), d3.mean(point, (d: any) => d[1])];
      }
      return [this.width / 2, this.height / 2];
    }

    // redraw
    const redraw = () => {
      const xr = tx().rescaleX(this.scaleX);
      const yr = ty().rescaleY(this.scaleY);

      gx.call(this.axisX, xr);
      gy.call(this.axisY, yr);

      dots
        .attr('cx', (d: any) => xr(d[0]))
        .attr('cy', (d: any) => yr(d[1]))
        .attr('r', 16);

      /* vo
        .attr('d',
          d3.Delaunay.from(this.data.map(d => [xr(d[0]), yr(d[1])]))
            .voronoi([35, 0, this.width - this.margins.right, this.height - this.margins.bottom])
            .render()
        )
        .attr('fill', 'none')
        .attr('stroke', 'none'); */
    }

    // aplica os zooms
    const zoom = d3.zoom()
      .on('zoom', (event) => {
        const t = event.transform;
        const k = t.k / this.z.k;
        const point = center(event, this);

        // Verificar se é eixo e se tecla shift está pressionada
        const doX = point[0]! > this.scaleX.range()[0];
        const doY = point[1]! < this.scaleY.range()[0];
        const shift = event.sourceEvent && event.key === 'Shift';

        if (k === 1) {
          doX && gx.call(zoomX.translateBy, (t.x - this.z.x) / tx().k, 0);
          doY && gy.call(zoomY.translateBy, 0, (t.y - this.z.y) / ty().k);
        } else {
          doX && gx.call(zoomX.scaleBy, shift ? 1 / k : k, point);
          doY && gy.call(zoomY.scaleBy, k, point);
        }

        this.z = t;

        redraw();
      });

    // aplica o zoom ao svg
    this.svg
      .call(zoom)
      .call(zoom.transform, d3.zoomIdentity.scale(0.8))
      .node();
  }

}
