import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { Observable, of, tap } from 'rxjs';
import { GenerateUuidService } from 'src/utils/generate-uuid.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Platform } from '@angular/cdk/platform';
@Component({
  selector: 'app-covid-cases',
  templateUrl: './covid-cases.component.html',
  styleUrls: ['./covid-cases.component.scss'],
})
export class CovidCasesComponent implements OnInit {
  svg: any;
  margin = { top: 20, left: 40, bottom: 20, rigtht: 20 };
  width = 750;
  height = 400;
  dataset = d3.csv(
    'https://raw.githubusercontent.com/luizclaudiolc/angular-d3/master/src/data/vaccination/vaccination-data.csv'
  );
  data: Array<any> = [];
  scaleX: any;
  scaleY: any;
  // criar um array de cores
  colors = d3.scaleOrdinal(d3.schemeCategory10);
  id?: string;
  breakpoints: Array<any> = [
    Breakpoints.XSmall,
    Breakpoints.Small,
    Breakpoints.Medium,
    Breakpoints.Large,
    Breakpoints.XLarge,
    Breakpoints.HandsetPortrait,
    Breakpoints.HandsetLandscape,
    Breakpoints.WebPortrait,
    Breakpoints.WebLandscape,
    Breakpoints.TabletPortrait,
    Breakpoints.TabletLandscape,
    Breakpoints.Web,
    Breakpoints.Handset,
    Breakpoints.Tablet,
  ];
  constructor(private makeId: GenerateUuidService,
    private responsive: BreakpointObserver,
    private navegador: Platform) {}

  ngOnInit(): void {
    this.id = this.makeId.generateUuid();
    console.log(this.id);
    Promise.all([this.dataset]).then((data) => {
      this.data = data[0];
      this.main(this.data);

      this.responsive.observe(this.breakpoints)
        .pipe(
          tap((result) => {
            const breakpoints = result.breakpoints;
            console.log(breakpoints);
          })
        )
        .subscribe();
    });

    this.drawSvg();
  }

  main(data: any): void {
    const americas = data.filter((d: any) => d.WHO_REGION === 'AMRO'
        && d.PERSONS_FULLY_VACCINATED > 1000000);
      console.log(americas);
    
      this.updateChart(americas);
      this.interativeEvents();
  };

  drawSvg(): void {
    d3.select(`#covid-cases`)
      .append('svg')
      // .style('background-color', '#f0f')
      .attr('width', this.width)
      .attr('height', this.height)
      .attr('id', `svg-${this.id}`);

    d3.select(`svg#svg-${this.id}`).append('g').attr('id', `g-${this.id}-axis-x`);
    d3.select(`svg#svg-${this.id}`).append('g').attr('id', `g-${this.id}-axis-y`);
    d3.select(`svg#svg-${this.id}`).append('g').attr('id', `g-${this.id}-bars`);
  };

  updateChart(data: Array<any>): void {
    if (!data.length) return;

    // *** update svg container *** //
    d3.select(`svg#svg-${this.id}`)
      .attr('width', this.width)
      .attr('height', this.height);

    // *** update axis *** //
    const xDomain = data.map((d) => d.ISO3);
    const xRange = [this.margin.left, this.width - this.margin.rigtht];
    this.scaleX = d3.scaleBand()
      .domain(xDomain)
      .range(xRange)
      .padding(0.2)
      .paddingInner(0.4)
      .paddingOuter(0.2);

    // *** update axis *** //
    const yDomain = [d3.max(data, (d) => Number(d.PERSONS_FULLY_VACCINATED)), 0] as Array<number>;
    const yRange = [this.margin.top, this.height - this.margin.bottom];
    this.scaleY = d3.scaleLinear()
      .domain(yDomain)
      .range(yRange);

    const axisX = d3.axisBottom(this.scaleX)
      .tickSizeOuter(0)
      .tickPadding(2);
    
      d3.select(`g#g-${this.id}-axis-x`)
      .attr('transform', `translate(0, ${this.height - this.margin.bottom})`)
      .transition()
      .duration(1000)
      .call(axisX as any);

    const axisY = d3.axisLeft(this.scaleY)
      .ticks(5)
      .tickSizeOuter(0)
      .tickFormat((d: any) => d3.format('.1s')(d));
    
      d3.select(`g#g-${this.id}-axis-y`)
      .attr('transform', `translate(${this.margin.left}, 0)`)
      .transition()
      .duration(1000)
      .call(axisY as any);

    // *** create bars *** //
    d3.select(`g#g-${this.id}-bars`)
      .selectAll('rect')
      .data(data)
      .join(
        (enter: any) => enter.append('rect'),
        (update: any) => update,
        (exit: any) => exit.remove()
      )
      .attr('x', (d: any, i: any) => this.scaleX(d.ISO3))
      .attr('y', (d: any, i: any) => this.scaleY(+d.PERSONS_FULLY_VACCINATED))
      .attr('width', this.scaleX.bandwidth())
      .attr('height', (d: any, i: any) =>
        this.height - this.margin.bottom - this.scaleY(+d.PERSONS_FULLY_VACCINATED)
      )
      .attr('fill', (d: any, i: any) => this.colors(d.ISO3))
      .attr('id', (d: any, i: any) => `bar-${this.id}-${i}`);
  };

  interativeEvents(): void {
    const mouseClick = (el: any) => {
      el
        .attr('stroke-width', 10)
        .attr('y', (d: any, i: any) => this.scaleY(+d.PERSONS_FULLY_VACCINATED) - 5)
        .attr('stroke', (d: any, i: any) => this.colors(d.ISO3))
        .transition()
        .duration(200)
        .attr('y', (d: any, i: any) => this.scaleY(+d.PERSONS_FULLY_VACCINATED))
        .attr('stroke-width', 0);
    };

    d3.select(`g#g-${this.id}-bars`)
      .selectAll('rect')
        .on('click', (event) =>
          mouseClick(d3.select(event.currentTarget))
        )
        .on('mousemove', (event, d: any) => {
          const { offsetX, offsetY } = event;
          const isLeft = offsetX < this.width / 2;
          const isTop = offsetY < this.height / 2;
          const { height: tipHeight, width: tipWidth } = 
            document.querySelector('#tooltip')?.getBoundingClientRect() as DOMRect;

          d3.select(event.currentTarget)
            .style('cursor', 'pointer')
            .style('opacity', 0.86);

          d3.select('#tooltip')
            .style('position', 'absolute')
            .style('background-color', '#FAFAFA')
            .style('border', '1px solid #000')
            .style('border-radius', '5px')
            .style('box-shadow', '0 0 5px #000')
            .style('padding', '10px')
            .transition()
            .duration(400)
            .style('opacity', 0.91)
            .style('top', `${isTop ? event.pageY + 20 : event.pageY - tipHeight - 10}px`)
            .style('left', `${isLeft ? event.pageX + 20 : event.pageX - tipWidth - 20}px`);

          d3.select('#tooltip-text')
            .html(`
            <div style="width: 12px; height:12px; margin-right: .25rem; 
            background: ${this.colors(d.ISO3)};"></div> 
              País: ${d.COUNTRY} (${d.ISO3})
              <p>
                  População totalmente vacinada:
                <b>
                  ${Number(d.PERSONS_FULLY_VACCINATED).toLocaleString('pt-BR')}
                </b>
              </p>
          `)
        })
        .on('mouseleave', (event) => {
          d3.select('#tooltip')
            .transition()
            .duration(400)
            .style('opacity', 0)
            .style('pointer-events', 'none');

          d3.select(event.currentTarget)
            .style('cursor', 'default')
            .style('opacity', 1);
      });
  };
}
