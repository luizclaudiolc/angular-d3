import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-axis-generator',
  templateUrl: './axis-generator.component.html',
  styleUrls: ['./axis-generator.component.scss']
})
export class AxisGeneratorComponent implements OnInit {
  svg: any;
  margin = { top: 40, right: 40, bottom: 30, left: 50 };
  width = 750;
  height = 400;
  scaleX: any;
  scaleY: any;
  dots: any;
  lineLength!: number;
  color = d3.scaleOrdinal(d3.schemeCategory10);
  data = {
    monthAndPercentage: [
      { month: 'Jan', percentage: 15, year: 21 },
      { month: 'Fev', percentage: 75, year: 21 },
      { month: 'Mar', percentage: 35, year: 21 },
      { month: 'Abr', percentage: 50, year: 21 },
      { month: 'Mai', percentage: 11, year: 21 },
      { month: 'Jun', percentage: 60, year: 21 },
      { month: 'Jul', percentage: 65, year: 21 },
      { month: 'Ago', percentage: 50, year: 21 },
      { month: 'Set', percentage: 35, year: 21 },
      { month: 'Out', percentage: 100, year: 21 },
      { month: 'Nov', percentage: 15, year: 21 },
      { month: 'Dez', percentage: 66, year: 21 },
      { month: 'Jan', percentage: 3, year: 22 },
      // { month: 'Fev', percentage: 45, year: 22 },
      // { month: 'Mar', percentage: 35, year: 22 },
      // { month: 'Abr', percentage: 50, year: 22 },
      // { month: 'Mai', percentage: 11, year: 22 },
      // { month: 'Jun', percentage: 60, year: 22 },
      // { month: 'Jul', percentage: 65, year: 22 },
      // { month: 'Ago', percentage: 50, year: 22 },
      // { month: 'Set', percentage: 35, year: 22 },
      // { month: 'Out', percentage: 100, year: 22 },
      // { month: 'Nov', percentage: 15, year: 22 },
      // { month: 'Dez', percentage: 66, year: 22 }
    ]
  };
  constructor(@Inject(DOCUMENT) private document: Document) { }
  
  ngOnInit(): void {
    this.drawChart();
    this.chartUpdate();
    this.lineAnimation();
    this.dotsAnimation();
    this.mouseEvents();
  }

  ngAfterViewInit(): void {
  };

  drawChart(): void {
    this.svg = d3.select('#axis')
      .append('svg')
      // .style('background-color', '#F6F8FA')
      .attr('id', 'line-chart')
      .attr('width', this.width)
      .attr('height', this.height);

    d3.select('svg#line-chart').append('g').attr('id', 'line-g-x-axis');
    d3.select('svg#line-chart').append('g').attr('id', 'line-g-y-axis');
    d3.select('svg#line-chart').append('g').attr('id', 'line-g-line-path');
    d3.select('svg#line-chart').append('g').attr('id', 'line-g-dots');

    d3.select('g#line-g-line-path').append('path').attr('id', 'line-path');
  };

  chartUpdate(): void {
    if (!this.data.monthAndPercentage.length) return;

    // update svg dimensions 
    d3.select('svg#line-chart')
      .attr('width', this.width)
      .attr('height', this.height);

    // ****** Scales ****** //
    this.scaleX = d3.scalePoint()
      .domain(this.data.monthAndPercentage.map(d => `${d.month}/${d.year}`))
      .range([this.margin.left, this.width - this.margin.right]);

    this.scaleY = d3.scaleLinear()
    .domain([0, d3.max(this.data.monthAndPercentage, d => d.percentage)] as [number, number])
    .range([this.height - this.margin.bottom, this.margin.top]);

    // ****** X-Axis ****** //
    const xAxis = d3.axisBottom(this.scaleX)
      // .ticks(this.width / 80) // verificar se é necessário
      // .tickFormat(d => d.)̣
      .tickSizeOuter(0)
      // .tickSizeInner(5);

    d3.select('#line-g-x-axis')
      .call(xAxis as any)
      .attr('transform', `translate(0, ${this.height - this.margin.bottom})`);

    // ****** Y-Axis ****** //
    const yAxis = d3.axisLeft(this.scaleY)
      .ticks(this.height / 80) // verificar se é necessário
      .tickSize(this.margin.left + this.margin.right - this.width)
      .tickSizeOuter(0)
      .tickFormat((d) => `${d}%`);

    d3.select('g#line-g-y-axis')
      .call(yAxis as any)
      .attr('transform', `translate(${this.margin.left}, 0)`)
      .selectAll('line')
      .attr('stroke', 'gray')
      .attr('stroke-dasharray', '10,5')
      .attr('opacity', 0.1);

    d3.select('g#line-g-y-axis')
      .selectAll('text')
      .attr('pointer-events', 'none');

    d3.select('#line-g-y-axis').select('path.domain').attr('stroke', 'none');

    // ****** Line ****** //
      const generatorLine = d3.line()
      .x((d: any) => d[0])
      .y((d: any) => d[1])
      .curve(d3.curveCardinal.tension(0.5));

      const linePath = d3.select('#line-path')
        .attr('d', generatorLine(this.data.monthAndPercentage.map(d => [this.scaleX(`${d.month}/${d.year}`),
          this.scaleY(d.percentage)])))
        .attr('fill', 'none')
        .attr('stroke', (d: any) => `${this.color(d)}`)
        .attr('stroke-width', 2);
        
      // get line length
      this.lineLength = this.document.querySelector<any>('#line-path')?.getTotalLength();

      // ****** Dots ****** //
      this.dots = d3.select('g#line-g-dots')
        .selectAll('circle')
        .data(this.data.monthAndPercentage)
        .join(
          enter => enter.append('circle'),
          (update: any) => update,
          exit => exit.remove()
        )
        .attr('id', (_d: any, i: any) => `circle-${i}`)
        .attr('cx', (d: any) => this.scaleX(`${d.month}/${d.year}`) as any)
        .attr('cy', (d: any) => this.scaleY(d.percentage))
        .attr('r', 5)
        .attr('fill', '#F6F8FA')
        .attr('stroke', (d: any) => `${this.color(d)}`)
        .attr('class', 'dot')
  };

  // ****** line Animation ****** //
  lineAnimation(): void {
    d3.select('#line-path')
      .attr('stroke-dasharray', this.lineLength * 10)
      .attr('stroke-dashoffset', this.lineLength * 10)
      .transition()
      .duration(1400)
      .ease(d3.easeExpIn)
      .attr('stroke-dashoffset', 0);

    this.chartUpdate();
  };

  // ****** dots Animation ****** //
  dotsAnimation(): void {
    this.dots
      .attr('r', 0)
      .transition()
      .delay((d: any, i: number, arr: any) => (i * 800) / arr.length + 400)
      .attr('r', 5);
  };

  // ****** mouseEvents ****** //
  mouseEvents(): void {
    const { color } = this;
    const mouseMove = (event: any, d: any) => {
      const target = event.target;
      const id = target.id;
      const index = id.split('-')[1];
      const data = this.data.monthAndPercentage[index];
      const { offsetX, offsetY } = event;
      const isLeft = offsetX < this.width / 2;
      const isTop = offsetY < this.height / 2;
      const { width: tipWidth, height: tipHeight } =
        document.querySelector<any>('#tooltip').getBoundingClientRect();
      
      d3.select('#tooltip')
        .style('position', 'absolute')
        .style('background-color', 'rgba(221, 203, 203, 0.685)')
        .style('color', '#000')
        .style('border', `1px solid ${color(d)}`)
        .style('border-radius', '5px')
        .style('padding', '10px')
        .style('box-shadow', '0px 0px 10px rgba(0, 0, 0, 0.5)')
        .style('font-weight', 'bold')
        .style('pointer-events', 'none')
        .style('left', `${isLeft ? event.pageX + 10 : event.pageX - tipWidth - 10}px`)
        .style('top', `${isTop ? event.pageY + 10 : event.pageY - tipHeight - 10}px`)
        .transition()
        .duration(400)
        .style('opacity', 0.91);

      d3.select('#tooltip-text')
        .html(`
          <div
          style="
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background-color: ${color(d)};
            margin-right: .25rem;
          "
          ></div>
          <span>Mês referência: ${this.parseMonth(data.month)}/${data.year}</span>
          <br>
          <span>Taxa de sucesso: ${data.percentage}%</span>
        `)
        

      d3.select(target)
          .attr('r', 7.5)
          .attr('stroke', (d: any) => `${color(d)}`)
          .attr('stroke-width', 2)
          .attr('cursor', 'pointer')
    };

    const mouseLeave = (event: any) => {
      const target = event.target;
      d3.select(target)
          .attr('r', 5)
          .attr('stroke-width', 1)
          .attr('stroke', (d: any) => `${color(d)}`);

      d3.select('#tooltip')
        .transition()
        .duration(400)
        .style('opacity', 0)
        .style('pointer-events', 'none');
    };

    const mouseClick = (event: any) => {
      const target = event.target;
      d3.select(target)
          .attr('r', 10)
          .attr('stroke', (d: any) => `${color(d)}`)
          .transition()
          .attr('r', 7.5)
    };
    
    d3.selectAll('.dot')
      .on('mousemove', mouseMove)
      .on('mouseleave', mouseLeave)
      .on('click', mouseClick);
  };

  // ****** ParseMonth ****** //
  parseMonth(month: string): string {
    const months = {
      Jan: 'Janeiro',
      Fev: 'Fevereiro',
      Mar: 'Março',
      Abr: 'Abril',
      Mai: 'Maio',
      Jun: 'Junho',
      Jul: 'Julho',
      Aug: 'Agosto',
      Set: 'Setembro',
      Out: 'Outubro',
      Nov: 'Novembro',
      Dez: 'Dezembro'
    }[month] || month;

    return months;
  }
  
}
