import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { GenerateUuidService } from 'src/utils/generate-uuid.service';

@Component({
  selector: 'app-scatter',
  templateUrl: './scatter.component.html',
  styleUrls: ['./scatter.component.scss']
})
export class ScatterComponent implements OnInit {
  data = [
    {'Framework': 'Vue', 'Stars': '166443', 'Released': '2014'},
    {'Framework': 'React', 'Stars': '150793', 'Released': '2013'},
    {'Framework': 'Angular', 'Stars': '62342', 'Released': '2016'},
    {'Framework': 'Backbone', 'Stars': '27647', 'Released': '2010'},
    {'Framework': 'Ember', 'Stars': '21471', 'Released': '2011'},
    {'Framework': 'Knockout', 'Stars': '69055', 'Released': '2012'},
    {'Framework': 'Dojo', 'Stars': '18079', 'Released': '2009'},
    {'Framework': 'ExtJS', 'Stars': '130171', 'Released': '2014'},
    {'Framework': 'D3.js', 'Stars': '10865', 'Released': '2015'},
    {'Framework': 'Meteor', 'Stars': '160983', 'Released': '2009'},
    {'Framework': 'Laravel', 'Stars': '102063', 'Released': '2018'},
    {'Framework': 'Redux', 'Stars': '86443', 'Released': '2014'},
    {'Framework': 'Nest', 'Stars': '146443', 'Released': '2011'},
    {'Framework': 'Webpack', 'Stars': '166443', 'Released': '2017'},
  ];

  svg: any;
  margin = {top: 40, right: 40, bottom: 30, left: 50};
  width = 750;
  height = 400;
  colors = d3.scaleOrdinal(d3.schemePaired);
  scaleX: any;
  scaleY: any;
  axisX: any;
  axisY: any;
  points: any;
  id?: string;

  constructor(private makeId: GenerateUuidService) { }

  ngOnInit(): void {
    this.createSvg();
    this.updateChart();
    this.eventosMouse();

  }

  createSvg(): void {
    this.id = `scatter-${this.makeId.generateUuid()}`;

    this.svg = d3.select('#scatter')
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height)
      .attr('id', `svg-${this.id}`);

    d3.select(`svg#svg-${this.id}`).append('g').attr('id', `group-${this.id}-points`);
    d3.select(`svg#svg-${this.id}`).append('g').attr('id', `group-${this.id}-text`);
    d3.select(`svg#svg-${this.id}`).append('g').attr('id', `group-${this.id}-axis-x`);
    d3.select(`svg#svg-${this.id}`).append('g').attr('id', `group-${this.id}-axis-y`);
    d3.select(`svg#svg-${this.id}`).append('g').attr('id', `group-${this.id}-grid-x`);
    d3.select(`svg#svg-${this.id}`).append('g').attr('id', `group-${this.id}-grid-y`);
  }

  updateChart(): void {
    if (!this.data.length) return;

    // *** update svg dimensions *** //
    d3.select(`svg#svg-${this.id}`)
      .attr('width', this.width)
      .attr('height', this.height);

    // *** create scales *** //
    this.scaleX = d3.scaleLinear()
      .domain([2008, d3.max(this.data, ({ Released }) => +Released + 1)] as Array<number>)
      .range([this.margin.left, this.width - this.margin.right]);

    this.scaleY = d3.scaleLinear()
      .domain(d3.extent(this.data, ({ Stars }) => +Stars) as Array<number>)
      .range([this.height - this.margin.bottom, this.margin.top]);

    // *** create axis *** //
    this.axisX = d3.axisBottom(this.scaleX)
      .tickFormat((d: any) => d);

    d3.select(`g#group-${this.id}-axis-x`)
      .attr('transform', `translate(0, ${this.height - this.margin.bottom})`)
      .transition()
      .duration(1000)
      .call(this.axisX);

    this.axisY = d3.axisLeft(this.scaleY)
      .tickFormat((d: any) => Number(d).toLocaleString('pt-BR'));

    d3.select(`g#group-${this.id}-axis-y`)
      .attr('transform', `translate(${this.margin.left}, 0)`)
      .transition()
      .duration(1000)
      .call(this.axisY);

    // *** create points *** //
    this.points = d3.select(`g#group-${this.id}-points`)
      .selectAll('circle')
      .data(this.data)
      .join(
        enter => enter.append('circle'),
        update => update,
        exit => exit.remove()
      )
      .attr('cx', ({ Released }) => this.scaleX(+Released))
      .attr('cy', ({ Stars }) => this.scaleY(+Stars))
      .transition()
      .delay((d, i) => i * 100)
      .duration(1000)
      .attr('r', 10)
      .attr('stroke', ({ Framework }) => this.colors(Framework))
      .attr('stroke-width', 1.5)
      .attr('fill', '#fff')
      .attr('id', (d, i) => `point-${this.id}-${i}`);

    // *** create text *** //
    d3.select(`g#group-${this.id}-text`)
      .selectAll('text')
      .data(this.data)
      .join(
        enter => enter.append('text'),
        update => update,
        exit => exit.remove()
      )
      .attr('x', ({ Released }) => this.scaleX(+Released))
      .attr('y', ({ Stars }) => this.scaleY(+Stars) - 10)
      .text(({ Framework }) => Framework)
      .attr('fill', ({ Framework }) => this.colors(Framework))
      .attr('text-anchor', 'middle');

    // *** create grids *** //
    const gridX: any = d3.axisBottom(this.scaleX)
      .tickSize(-this.height + this.margin.top + this.margin.bottom)
      .tickFormat(() => '')
      .tickSizeOuter(0);

    const gridY: any = d3.axisLeft(this.scaleY)
      .tickSize(-this.width + this.margin.left + this.margin.right)
      .tickFormat(() => '')
      .tickSizeOuter(0);

    d3.select(`g#group-${this.id}-grid-x`)
      .attr('transform', `translate(0, ${this.height - this.margin.bottom})`)
      .call(gridX);

    d3.select(`g#group-${this.id}-grid-y`)
      .attr('transform', `translate(${this.margin.left}, 0)`)
      .call(gridY);

    d3.select(`g#group-${this.id}-grid-y`)
      .selectAll('line')
      .attr('stroke', '#ccc')
      .attr('stroke-dasharray', '2,2');

    d3.select(`g#group-${this.id}-grid-x`)
      .selectAll('line')
      .attr('stroke', '#ccc')
      .attr('stroke-dasharray', '2,2');
  }

  eventosMouse(): void {
    const self = this;
    d3.selectAll('circle')
    .on('mousemove', function(event: any) {
        const target = d3.select(this);
        const id = target.attr('id');
        const index: any = id.split('-')[3];
        const { offsetX, offsetY } = event;
        const isLeft = offsetX < self.width / 2;
        const isTop = offsetY < self.height / 2;
        const { width: tipWidth, height: tipHeigth } =
          document.querySelector<any>('.tooltip').getBoundingClientRect();
        
        d3.select(`.tooltip`)
          .style('position', 'absolute')
          .style('background', '#fff')
          .style('color', '#000')
          .style('padding', '10px')
          .style('border', '1px solid #000')
          .style('border-radius', '5px')
          .style('box-shadow', '0 0 5px #000')
          .style('left', `${isLeft ? event.pageX + 10 : event.pageX - tipWidth - 10}px`)
          .style('top', `${isTop ? event.pageY + 10 : event.pageY - tipHeigth - 10}px`)
          .transition()
          .duration(500)
          .style('opacity', 0.91);
        
        d3.select(`.tooltip-text`)
          .html(`
            <div
              style="
                width: 12px;
                height: 12px;
                border-radius: 50%;
                background: ${self.colors(self.data[index].Framework)};
                margin-right: .25rem;
              "
            ></div>
            Framework: <b>${self.data[index].Framework}</b>
            <br>
            Stars: <b>${self.data[index].Stars}</b>
          `);
        

        d3.select(this)
        .transition()
        .duration(150)
        .attr('r', 15)
        .style('opacity', 0.6)
        .style('cursor', 'pointer');
      })
      .on('mouseleave', function() {
        d3.select(this)
        .transition()
        .duration(150)
        .attr('r', 10)
        .style('opacity', 1)
        .style('cursor', 'default');

        d3.select('.tooltip')
          .transition()
          .duration(500)
          .style('opacity', 0);
      });
  }
}
