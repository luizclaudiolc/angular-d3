import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { GenerateUuidService } from 'src/utils/generate-uuid.service';

@Component({
  selector: 'app-arc-pie-generator',
  templateUrl: './arc-pie-generator.component.html',
  styleUrls: ['./arc-pie-generator.component.scss'],
})
export class ArcPieGeneratorComponent implements OnInit {
  svg: any;
  margin = { top: 20, right: 20, bottom: 30, left: 40 };
  width = 750;
  height = 400;
  dataset = [90, 10, 70, 30, 50, 4, 6, 8, 10, 120, 55];
  colors = d3.schemeSpectral[this.dataset.length]; // serve fazer uma escaça de cor no grafico
  arcGen: any;
  pie: any;
  id?: string;

  constructor(private makeId: GenerateUuidService) {}

  ngOnInit(): void {
    this.id = this.makeId.generateUuid();
    this.drawSvg();
    this.updatePie();
    this.initialAnimation();
    this.mouseEvents();
    this.textStaticWithTotal();
  }

  drawSvg(): void {
    this.svg = d3
      .select(`#arc-pie`)
      .append('svg')
      // .style('background-color', '#F6F8FA')
      .attr('width', this.width)
      .attr('height', this.height)
      .attr('id', `pie-arc-${this.id}`);

    d3.select(`svg#pie-arc-${this.id}`).append('g').attr('id', `pie-arc-${this.id}-group`)
      .attr('transform', `translate(${this.width / 2}, ${this.height / 2})`);
    d3.select(`svg#pie-arc-${this.id}`).append('g').attr('id', `pie-arc-${this.id}-text`);
    d3.select(`svg#pie-arc-${this.id}`).append('g').attr('id', `pie-arc-text-${this.id}-dinamic`);
    d3.select(`svg#pie-arc-${this.id}`).append('g').attr('id', `pie-arc-text-${this.id}-static`);
  };

  updatePie(): void {
    if (!this.dataset.length) return;

    // *** update dimensions *** //
    d3.select(`#pie-arc-${this.id}`)
      .attr('width', this.width)
      .attr('height', this.height);

    // *** create arc generator *** //
    this.arcGen = d3.arc()
      .innerRadius(100)
      .outerRadius(160)
      .cornerRadius(2)
      .padAngle(0.03)
      .padRadius(50);
      // .startAngle(0)
      // .endAngle(Math.PI / 4);

      // d3.select('g#pie-arc-group')
      //   .append('path')
      //   .attr('d', this.arcGen)
      //   .attr('fill', '#ff0000')
      //   .attr('stroke', '#000')
      //   .attr('stroke-width', 2);

    // *** create pie generator *** //
    this.pie = d3.pie();

    // const data = this.transformeValueInPercentage(this.dataset);

    // *** create arc generator *** //
    d3.select(`g#pie-arc-${this.id}-group`)
      .selectAll('path')
      .data(this.pie(this.dataset))
      .join(
        enter => enter.append('path'),
        update => update,
        exit => exit.remove()
      )
      .attr('fill', (d: any, i: any) => this.colors[i])
      .attr('stroke', '#000')
      .attr('d', this.arcGen);
  };

  initialAnimation(): void {
    const { arcGen } = this;
    d3.selectAll('path')
      .transition()
      .duration(350)
      .attrTween('d', (d: any) => {
        const interpolate = d3.interpolate(d.endAngle, d.startAngle);
        return (t: any) => {
          d.startAngle = interpolate(t);
          return arcGen(d);
        };
      });
  };

  mouseEvents(): void {
    const mouseEnter = (event: any) => {
      const el = d3.select(event.target);
      this.animationSlice(el);
      this.addText(el);
    };

    const mouseLeave = (event: any) => {
      const el = d3.select(event.target);
      this.animationSliceBack(el);
      this.removeText(el);
    };

    d3.selectAll('path')
      .on('mouseover', mouseEnter)
      .on('mouseout', mouseLeave);
  };

  animationSlice(el: any): void {
    const { arcGen } = this;
    arcGen
      .innerRadius(120)
      .outerRadius(180)

    el
      .transition()
      .duration(200)
      .attr('d', (d: any) => arcGen(d))
  };

  animationSliceBack(el: any): void {
    const { arcGen } = this;
    arcGen
      .innerRadius(100)
      .outerRadius(160)

    el
      .transition()
      .duration(200)
      .attr('d', (d: any) => arcGen(d))
  };

  addText(el: any): void {
    const { arcGen } = this;
    const percentage = this.transformeValueInPercentage(el.data().map((d: any) => d.value));
    d3.select(`g#pie-arc-text-${this.id}-dinamic`)
      .append('text')
      .attr('x', this.width / 2)
      .attr('y', this.height / 2)
      .attr('font-size', '3.5em')
      .attr('fill', (d: any, i: any) => percentage[i].percentage <= 10 ? '#f00f0f' : 'royalblue')
      .attr('text-anchor', 'middle')
      .attr('alignment-baseline', 'middle')
      .text((d: any, i: number) => `${percentage.map((d: any) => Math.round(d.percentage))}%`);

    d3.select(`g#pie-arc-text-${this.id}-dinamic`)
      .append('text')
      .attr('x', this.margin.left)
      .attr('y', this.margin.top)
      .attr('font-size', '1.5em')
      .attr('fill', (d: any, i: number) => percentage[i].value <= 20 ? '#f00f0f' : 'royalblue')
      .text((d: any, i: number) => `Valor: ${el.data().map((d: any) => d.value)}`);
  };

  removeText(el: any): void {
    d3.select(`g#pie-arc-text-${this.id}-dinamic`)
      .selectAll('text')
      .remove();
  };

  transformeValueInPercentage(data: Array<any>): any {
    return data.map((d: any) => 
    ({ value: d, percentage: (d * 100) / this.dataset.reduce((a, b) => a + b) }));
  }

  textStaticWithTotal(): void {
    d3.select(`g#pie-arc-text-${this.id}-static`)
      .append('text')
      .attr('x', this.width - this.margin.right)
      .attr('y', this.margin.top)
      .attr('font-size', '1.5em')
      .attr('text-anchor', 'end')
      .attr('fill', 'royalblue')
      .text(`Valor total: ${this.dataset.reduce((a, b) => a + b)}`);
  }
}

