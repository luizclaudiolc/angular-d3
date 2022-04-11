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
  dataset = [10, 70, 30, 50, 4, 5, 89, 101, 11, 78];
  colors = d3.scaleOrdinal(d3.schemeCategory10);
  arcGen: any;
  pie: any;
  id?: string;
  text = 'Digite um Valor';

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
      .attr('fill', (d: any, i: any) => this.colors(d))
      .attr('stroke', '#000')
      .attr('d', this.arcGen);
  };

  initialAnimation(): void {
    try {
      const { arcGen } = this;
        d3.selectAll('path')
          .transition()
          .duration(350)
          .attrTween('d', (d: any) => {
            const interpolate = d3.interpolate(d?.endAngle, d?.startAngle);
            return (t: any) => {
              d.startAngle = interpolate(t);
              return arcGen(d);
            };
        });
    }
    catch (e) {
      e;
    }
  };

  mouseEvents(): void {
    const mouseMove = (event: any, d: any) => {
      const el = d3.select(event.target);
      const valuePercentage = this.transformeValueInPercentage(el.data().map((d: any) => d.value));
      const { offsetX, offsetY } = event;
      const isLeft = offsetX < this.width / 2;
      const isTop = offsetY < this.height / 2;
      const { width: tipWidth, height: tipHeight } =
        document.querySelector<any>('#tooltip').getBoundingClientRect();
      
      d3.select('#tooltip')
        .style('position', 'absolute')
        .style('display', 'flex')
        .style('flex-direction', 'column')
        .style('color', '#cecece')
        .style('background-color', '#2e2e2e')
        .style('border', () => `1px solid ${valuePercentage[0].percentage < 10 ? '#ff0000' : 'royalblue'}`)
        .style('box-shadow', '0px 0px 5px #000')
        .style('border-radius', '5px')
        .style('padding', '10px')
        .style('left', `${isLeft ? event.pageX - 140 : event.pageX - tipWidth + 140}px`)
        .style('top', `${isTop ? event.pageY - 120 : event.pageY - tipHeight + 120}px`)
        .transition()
        .duration(500)
        .style('opacity', 0.91);

      d3.select('#tooltip-text')
        .html(`
        <div style="width: 12px; height:12px; border-radius: 6px; margin-right: 1.25rem; 
        background: ${ this.colors(d) };">
          </div>
          Valor: <b>${valuePercentage[0].value.toLocaleString('pt-BR', { 
            style: 'currency',
            currency: 'BRL',
          })}</b>
          <br>
          Representatividade: <b>${Math.round(valuePercentage[0].percentage)}</b>%
          <br>
          Total: <b>${this.dataset.reduce((a, b) => a + b, 0).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          })}</b>
        `);
        
      
      this.animationSlice(el);
      this.addText(el);
    };

    const mouseLeave = (event: any) => {
      const el = d3.select(event.target);
      this.animationSliceBack(el);
      this.removeText(el);

      d3.select('#tooltip')
        .transition()
        .duration(500)
        .style('opacity', 0);
    };

    d3.selectAll('path')
      .on('mousemove', mouseMove)
      .on('mouseleave', mouseLeave);
  };

  animationSlice(el: any): void {
    const { arcGen } = this;
    arcGen
      .innerRadius(110)
      .outerRadius(170)

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

  addNumber(event: any): void {
    const data = document.querySelector('#add-number') as HTMLInputElement;
    const value = data.value;

    if (value === '' || value === '0') {
      alert('Digite um valor válido!');
      data.focus();
      return;
    };

    this.dataset.push(+value);
    this.updatePie();
    this.mouseEvents();
    this.initialAnimation();
    d3.select(`g#pie-arc-text-${this.id}-static`)
      .selectAll('text')
      .remove();
    this.textStaticWithTotal();
    data.value = '';
  }
}

