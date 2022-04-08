import { Component, OnChanges, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import * as d3 from 'd3';
import { BehaviorSubject, tap, timer } from 'rxjs';
import { GenerateUuidService } from 'src/utils/generate-uuid.service';

@Component({
  selector: 'app-scale-ordinal',
  templateUrl: './scale-ordinal.component.html',
  styleUrls: ['./scale-ordinal.component.scss']
})
export class ScaleOrdinalComponent implements OnInit, OnChanges {
  svg: any;
  margin = {top: 20, bottom: 30, left: 65, rigth: 20};
  width = 750;
  height = 400;
  data = [
    {name: 'Germany', value: 10000},
    {name: 'USA', value: 15000},
    {name: 'France', value: 7500},
    {name: 'UK', value: 25000},
    {name: 'Italy', value: 9900},
    {name: 'Spain', value: 7200},
    {name: 'Portugal', value: 2000},
    {name: 'Austria', value: 1000},
    {name: 'Belgium', value: 12500},
    {name: 'Switzerland', value: 3000},
    {name: 'Brazil', value: 5000},
    {name: 'Argentina', value: 3000},
  ];
  scaleX: any;
  scaleY: any;
  rects: any;
  colors = d3.scaleOrdinal(d3.schemeCategory10);
  id?: string;
  // test = new BehaviorSubject(false);

  constructor(private makeId: GenerateUuidService) { }

  ngOnInit(): void {
    this.drawSvg();
    this.drawUpdate(this.data);
    this.updateData();
    this.filterSelection();
    this.mouseEvents();
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  drawSvg(): void {
    this.id = this.makeId.generateUuid();

    this.svg = d3.select('#ordinal')
      .append('svg')
      // .style('background-color', '#cecece')
      .attr('width', this.width)
      .attr('height', this.height)
      .attr('id', `ordinal-svg-${this.id}`);

    d3.select(`svg#ordinal-svg-${this.id}`).append('g').attr('id',`ordinal-g-x-axis-${this.id}`);
    d3.select(`svg#ordinal-svg-${this.id}`).append('g').attr('id', `ordinal-g-y-axis-${this.id}`);
    d3.select(`svg#ordinal-svg-${this.id}`).append('g').attr('id', `ordinal-g-rects-${this.id}`);
  };

  drawUpdate(data: Array<any>): void {
    if (!data.length) return;

    // update chart
    /* d3.select('#ordinal-svg')
      .attr('width', this.width)
      .attr('height', this.height); */

    // *** scaleX *** //
    const XDomain = [0, d3.max(data, ({ value }) => value)] as Array<number>;
    this.scaleX = d3.scaleLinear()
      .domain(XDomain)
      .range([this.margin.left, this.width - this.margin.rigth]);

    // *** scaleY *** //
    const YDomain = data.map(({ name }) => name);
    this.scaleY = d3.scaleBand()
      .domain(YDomain)
      .range([this.height -this.margin.bottom, this.margin.top])
      .padding(0.1)
      .paddingInner(0.5)
      .paddingOuter(0.5);

    // *** axisX *** //
    const axisX = d3.axisBottom(this.scaleX)
      .ticks(10)
      .tickSizeOuter(5)
      .tickSizeInner(-this.height + this.margin.top + this.margin.bottom)
      .tickPadding(10)
      .tickFormat((value: any) => {
        return value >= 1000000
          ? `${(value / 1000000)} M`
          : value >= 1000
          ? `${(value / 1000)} mil`
          : value;
      });

    d3.select(`#ordinal-g-x-axis-${this.id}`)
      .transition()
      .duration(450)
      .call(axisX as any)
      .attr('transform', `translate(0, ${this.height - this.margin.bottom})`);

    // *** axisY *** //
    const axisY = d3.axisLeft(this.scaleY);
      
    d3.select(`#ordinal-g-y-axis-${this.id}`)
      .transition()
      .ease(d3.easeLinear)
      .duration(550)
      .delay((d, i) => i * 500)
      .call(axisY as any)
      .attr('transform', `translate(${this.margin.left}, 0)`)
      .selectAll('line')
      .attr('stroke', 'none');

    d3.select(`#ordinal-g-y-axis-${this.id}`)
      .selectAll('text')
      .attr('id', (d: any, i: any) => `text-${i}`);

    d3.select(`#ordinal-g-y-axis-${this.id}`)
      .selectAll('.domain')
      .attr('stroke', 'none');

    d3.select(`#ordinal-g-x-axis-${this.id}`)
      .selectAll('line')
      .attr('stroke', (d: any, i: any) => i === 0 ? 'none' : '#ccc')
      .attr('stroke-width', 1)
      .attr('stroke-opacity', 0.8)
      .attr('stroke-dasharray', '2,2');

    // *** rects *** //
    this.rects = d3.select(`#ordinal-g-rects-${this.id}`)
      .selectAll('rect')
      .data(data)
      .join(
        (enter) => enter.append('rect'),
        (update) => update,
        (exit) => exit.remove()
      )
      .attr('x', (d) => this.scaleX(0))
      .attr('y', ({ name }) => this.scaleY(name) - this.scaleY.bandwidth() + this.scaleY.bandwidth())
      .attr('height', this.scaleY.bandwidth())
      .attr('id', (d: any, i: number) => `rects-Ordinal-${i}`)
      .transition()
      .ease(d3.easeLinear)
      .duration(500)
      .delay((d, i) => i * 50)
      .attr('width', ({ value }) => this.scaleX(value) - this.scaleX(this.margin.left))
      .attr('fill', ({ name }, i: any) => this.colors(name))
  };

  // *** MouseEvents *** //
  mouseEvents(): void {
    const mouseMove = ({ offsetX, offsetY, target, pageX, pageY }: any, d: any) => {
        // const { offsetX, offsetY } = event;
        const isLeft = offsetX < this.width / 2;
        const isTop = offsetY < this.height / 2;
        const { width: tipWidth, height: tipHeight } =
          document.querySelector<any>('#tooltip').getBoundingClientRect();
        const name = target.__data__.name;
        const value = target.__data__.value;

        d3.select('#tooltip')
          .style('left', `${isLeft ? pageX + 20 : pageX - tipWidth - 20}px`)
          .style('top', `${isTop ? pageY + 10 : pageY - tipHeight - 10}px`)
          .style('border', `1px solid ${this.colors(name)}`)
          .transition()
          .duration(500)
          .style('opacity', 0.91)

          d3.select('#tootip-text')
            .html(`
            <div style="width: 100%; height:12px; margin-right: .25rem; 
            background: ${this.colors(name)};"></div>
              <hr>
              Name: <b>${name}</b>
              <br>
              Value: <b>${value.toLocaleString('pt-BR')}</b>
            `);

          d3.select(target)
            .style('opacity', 0.76)
            .style('cursor', 'pointer');
    };
    const mouseLeave = ({ target }: any) => {
      d3.select('#tooltip')
        .transition()
        .duration(500)
        .style('opacity', 0)
        .style('pointer-events', 'none');

      d3.select(target)
        .style('opacity', 1)
        .style('cursor', 'default');
    };

    const mouseClick = ({ target }: any) => {
      const targett = target;
      const id = targett.id;
      const index = id.split('-')[2];
      const name = this.data[index].name;
      const value = this.data[index].value;
      const newValue = this.data[index].value = value + 1500;

    this.changeData(name, newValue);
    };

    d3.select(`#ordinal-g-rects-${this.id}`)
      .selectAll('rect')
        .on('mousemove', mouseMove)
        .on('mouseleave', mouseLeave)
        .on('click', mouseClick);
  };

  // *** ChangeData *** //
  changeData(name: string, value: number): void {
    const index = this.data.findIndex((d) => d.name === name);
    this.data[index].value = value;
    this.data.sort((a, b) => a.value - b.value);
    this.drawUpdate(this.data);
  };

  // *** update Data *** //
  updateData(): void {
    let i = 0;
    const interval = setInterval(() => {
      if (i >= this.data.length) {
        clearInterval(interval);
        return;
      }
      const name = this.data[i].name;
      const value = this.data[i].value;
      const newValue = this.data[i].value = value + 1500;
      this.changeData(name, newValue);
      i++;
    }
    , 250);
  };

  filterSelection(): void {
    const selected = d3.select(`#select`)
      .append('select')
      .attr('id', `select-${this.id}`)
      .attr('class', 'select');

      const uniqueSelect = ['Todos', ...new Set(this.data.map(({ name }) => name))];

      selected.selectAll('option')
        .data(uniqueSelect)
        .join('option')
        .attr('value', d => d)
        .text(d => d);

      selected.on('change', () => {
        this.filterData(this.data, selected.property('value'));
      })
  }

  filterData(data: any, filter: string): void {
    if (filter === 'Todos') { 
      this.drawUpdate(data)
      this.mouseEvents();
      return;
    }

    const filtered = data.filter(({ name }: any) => name === filter);
    this.drawUpdate(filtered);
  }
}
