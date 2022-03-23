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
            console.log(result);
          })
        )
        .subscribe();

      const dom = document.getElementById('tooltip')?.getBoundingClientRect();
      console.log(dom);

      // console.log(data);
      // this.data = data[0];
      // console.log(this.data);
      // const Americas = this.data.filter((d) => d.WHO_REGION === 'AMRO'
      //   && d.PERSONS_FULLY_VACCINATED > 1000000);
      // console.log(Americas);

      // const tooltip = d3.select('#bar-cases').append('div')
      // .attr('class', 'tooltip')
      // .style('visibility', 'hidden')
      // .style('position', 'absolute')
      // .style('background-color', '#F6F8FA')
      // .style('border', '1px solid #000')
      // .style('border-radius', '5px')
      // .style('padding', '10px')
      // .style('font-size', '12px');

      // const mouseEnter = (event: any, d: any) => {
      //   d3.select(event.currentTarget)
      //     .style('opacity', 0.8)
      //     .style('cursor', 'pointer');

      //   tooltip
      //     .style('visibility', 'visible')
      //     .style('opacity', 0.8)
      //     .style('left', `${event.pageX + 30}px`)
      //     .style('top', `${event.pageY - 30}px`)
      //     // .style('color', '#0f0f')
      //     .html(`
      //       País: ${d.COUNTRY}
      //       <br>
      //       Pessoas totalmente vacinadas: 
      //       <strong>${Number(d.PERSONS_FULLY_VACCINATED).toLocaleString('pt-BR')}
      //     </strong>`);
      // }
  
      // const mousemove = (event: any) => {
      //   tooltip
      //     .style('left', `${event.pageX + 30}px`)
      //     .style('top', `${event.pageY - 30}px`);
      // }
  
      // const mouseLeave =  (event: any) => {
      //   d3.select(event.target)
      //     .style('opacity', 1);

      //   tooltip
      //     .style('visibility', 'hidden');
      // }

      // const mouseClick = (event: any) => {
      //   d3.select(event.target)
      //     .attr('stroke-width', 10)
      //     .attr('y', (d: any) => scaleY(Number(d.PERSONS_FULLY_VACCINATED)) - 5)
      //     .attr('stroke', (d: any) => this.colors(d.ISO3))
      //     .transition()
      //     .duration(250)
      //     .attr('y', (d: any) => scaleY(Number(d.PERSONS_FULLY_VACCINATED)))
      //     .attr('stroke-width', 0)
      // };

      // this.svg = d3.select('#bar-cases')
      //   .append('svg')
      //   // .style('background-color', '#f0f0f0')
      //   .attr('width', this.width)
      //   .attr('height', this.height)

      // const scaleX = d3.scaleBand()
      //   .domain(Americas.map((d) => d.ISO3))
      //   .range([this.margin.left, this.width - this.margin.rigtht])
      //   .padding(0.2)
      //   .paddingInner(0.4)
      //   .paddingOuter(0.2);

      // const scaleY = d3.scaleLinear()
      //   .domain([d3.max(Americas, (d) => Number(d.PERSONS_FULLY_VACCINATED)), 0] as [number, number])
      //   .range([this.margin.top, this.height - this.margin.bottom]);

      // this.svg
      //   .append('g')
      //   .attr(
      //     'transform',
      //     `translate(${0}, ${
      //       this.height - this.margin.top
      //     })`
      //   )
      //   .attr('id', 'x-axis');

      // this.svg
      //   .append('g')
      //   .attr('transform', `translate(${this.margin.left}, ${0})`)
      //   .attr('id', 'y-axis');

      // const axisX = d3.axisBottom(scaleX)
      //   .tickSizeOuter(0)
      //   .tickPadding(2);
        
      //   d3.select('#x-axis')
      //     .transition()
      //     .duration(1000)
      //     .call(axisX as any);

      // const axisY = d3.axisLeft(scaleY)
      //   .ticks(5)
      //   .tickSizeOuter(0)
      //   .tickFormat(d3.format('.1s'));
        
      //   d3.select('#y-axis')
      //     .transition()
      //     .duration(1000)
      //     .call(axisY as any);

      // this.svg
      //   .selectAll('rect')
      //   .data(Americas)
      //   .join(
      //     (enter: any) => enter.append('rect'),
      //     (update: any) => update,
      //     (exit: any) => exit.remove()
      //   )
      //   .attr('x', (d: any, i: any) => scaleX(d.ISO3))
      //   .attr('y', (d: any, i: any) => scaleY(Number(d.PERSONS_FULLY_VACCINATED)))
      //   .attr('width', scaleX.bandwidth())
      //   .attr('height', (d: any, i: any) =>
      //     this.height - this.margin.bottom - scaleY(Number(d.PERSONS_FULLY_VACCINATED))
      //   )
      //   .attr('fill', (d: any, i: any) => this.colors(d.ISO3))
      //   .attr('id', (d: any, i: any) => `bar-${i}`);
        
      // d3.selectAll('rect')
      //   .on('mouseenter', mouseEnter)
      //   .on('mousemove', mousemove)
      //   .on('mouseout', mouseLeave)
      //   .on('click', mouseClick);
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
          const tipWidth = document.getElementById('tooltip')!.getBoundingClientRect().width;
          const tipHeight = document.getElementById('tooltip')!.getBoundingClientRect().height;

          d3.select(event.currentTarget)
            .style('cursor', 'pointer')
            .style('opacity', 0.86);

          d3.select('#tooltip')
            .style('position', 'absolute')
            .style('background-color', '#FAFAFA')
            .style('border', '1px solid #000')
            .style('border-radius', '5px')
            .style('padding', '10px')
            .transition()
            .duration(200)
            .style('opacity', 0.91)
            .style('top', `${isTop ? event.pageY + 20 : event.pageY - tipHeight - 10}px`)
            .style('left', `${isLeft ? event.pageX + 20 : event.pageX - tipWidth - 20}px`)
          
          d3.select('#tooltip-text')
            .html(`
              <div>
                <p>País: ${d.COUNTRY} (${d.ISO3})</p>
                <p>População totalmente vacinada:
                  <b>${Number(d.PERSONS_FULLY_VACCINATED).toLocaleString('pt-BR')}
                  </b>
                </p>
              </div>
                `);
              })
        .on('mouseleave', (event) => {
          d3.select('#tooltip')
            .transition()
            .duration(200)
            .style('opacity', 0)
            .style('pointer-events', 'none');

          d3.select(event.currentTarget)
            .style('cursor', 'default')
            .style('opacity', 1);
      });
        

   /*  d3.select(`g#g-${this.id}-bars`)
      .selectAll('rect')
      .on('mouseover',(event: any, d: any) => {
        const {offsetX: x, offsetY: y } = event;
        const isLeft = x < this.width / 2;
        const isTop = y < this.height / 2;
        console.log(isLeft, isTop);
        const tipWidth = document.getElementById(`tooltip`)!.getBoundingClientRect().width;
        const tipHeight = document.getElementById(`tooltip`)!.getBoundingClientRect().height;
        console.log(tipWidth, tipHeight); */
        
    /* const Tipwidth = domElement?.getBoundingClientRect().width;
    const Tipheight = domElement?.getBoundingClientRect().height; */
   /*  console.log({
      Tipwidth,
      Tipheight,
    }); */
        
        
        /* d3.select(`#tooltip-${this.id}`)
          .style('border-color', this.colors(d.ISO3)) */
        
        /* d3.select(event.currentTarget)
          .attr('cursor', 'pointer')
          .style('opacity', 0.8);

        d3.select('#tooltip')
          .style('position', 'absolute')
          .style('background-color', '#FAFAFA')
          .style('opacity', 0.86)
          .style('top', `${event.pageY - 20}px`)
          .style('left', isLeft ? `${x + tipWidth * 0.25}` : 'unset')
          .style('right', isLeft ? 'unset' : `${this.width - x - tipWidth * 0.25}`)
          .text(`${d.COUNTRY} - ${Number(d.PERSONS_FULLY_VACCINATED).toLocaleString('pt-BR')}`);
      })
      .on('mouseout', (event: any) => {
        d3.select(event.currentTarget)
          .attr('cursor', 'default')
          .style('opacity', 1);

        d3.select('#tooltip')
          .style('opacity', 0);
      })
      .on('mousemove', (event: any) => {
        const {offsetX: x, offsetY: y } = event;
        const isLeft = x < this.width / 2;
        const isTop = y < this.height / 2;
        console.log(isLeft, isTop);
        const tipWidth = document.getElementById(`tooltip`)!.getBoundingClientRect().width;
        const tipHeight = document.getElementById(`tooltip`)!.getBoundingClientRect().height;
        console.log(tipWidth, tipHeight); */


        /* d3.select('#tooltip')
          .style('top', `${event.pageY - 20}px`)
          .style('left', isLeft ? `${x + tipWidth * 0.25}` : 'unset')
          .style('right', isLeft ? 'unset' : `${this.width - x - tipWidth * 0.25}`);
      })
      .on('click', (event: any) => {
        const el = d3.select(event.target);
        mouseClick(el);
      }) */
  };
}
