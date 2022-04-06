import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
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
export class CovidCasesComponent implements OnInit, OnChanges {
  svg: any;
  margin = { top: 20, left: 50, bottom: 20, rigtht: 20 };
  width = 750;
  height = 400;
  dataset = d3.csv(
    'https://raw.githubusercontent.com/luizclaudiolc/angular-d3/master/src/data/vaccination/vaccination-data.csv'
  );
  data: Array<any> = [];
  scaleX: any;
  scaleY: any;
  axisX: any;
  axisY: any;
  // criar um array de cores
  colors = d3.scaleOrdinal(d3.schemeSpectral[9]);
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
      this.selectFilter(this.data);
      

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

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.width || changes.height) {
      console.log('ngOnChanges');
      
    }
  }

  main(data: any): void {
    console.log(data);
    
    this.updateChart(data);
    // this.selectFilter(data);
    this.interativeEvents();
    this.legendY();
  };

  drawSvg(): void {
    this.svg = d3.select(`#covid-cases`)
      .append('svg')
      // .style('background-color', '#f0f')
      .attr('width', this.width)
      .attr('height', this.height)
      .attr('id', `svg-${this.id}`);

    d3.select(`svg#svg-${this.id}`).append('g').attr('id', `g-${this.id}-axis-x`);
    d3.select(`svg#svg-${this.id}`).append('g').attr('id', `g-${this.id}-axis-y`);
    d3.select(`svg#svg-${this.id}`).append('g').attr('id', `g-${this.id}-bars`);
    d3.select(`svg#svg-${this.id}`).append('g').attr('id', `g-${this.id}-legend`);
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
    const yDomain = [0, d3.max(data, (d) => Number(d.PERSONS_FULLY_VACCINATED))] as Array<number>;
    const yRange = [this.height - this.margin.bottom, this.margin.top];
    this.scaleY = d3.scaleLinear()
      .domain(yDomain)
      .nice()
      .range(yRange);

    this.axisX = (g: any) => g
      .attr('transform', `translate(0,${this.height - this.margin.bottom})`)
      .call(d3.axisBottom(this.scaleX).tickSizeOuter(0))
      // .call((g: any) => g.select('.domain').remove());

    /* this.responsive
      .observe(Breakpoints.Tablet)
      .pipe(
        tap((result) => {
          console.log(result.matches);
          if (result.matches) {
          this.axisY = (g: any) => g
            .attr('transform', `translate(${this.margin.left},0)`)
            .call(d3.axisLeft(this.scaleY)
            .ticks(12)
            .tickSizeInner(-this.width + this.margin.left + this.margin.rigtht)
            .tickSizeOuter(0)
            );

            this.updateChart(data);
          }
          
        })
      ).subscribe(); */

    this.axisY = (g: any) => g
      .attr('transform', `translate(${this.margin.left},0)`)
      .call(d3.axisLeft(this.scaleY)
        .ticks(12)
        .tickSizeInner(-this.width + this.margin.left + this.margin.rigtht)
        .tickPadding(10)
        .tickFormat((value: any) => {
          return value >= 1000000
          ? (value / 1000000 + ' M').toString().replace('.', ',')
          : value >= 1000
          ? (value / 1000 + ' mil').toString().replace('.', ',')
          : value.toString().replace('.', ',');
        } )
      )
      .call((g: any) => g.select('.domain').attr('stroke', 'none'));

    // *** update axis *** //
    d3.select(`g#g-${this.id}-axis-x`)
      .transition()
      .duration(500)
      .call(this.axisX);

    d3.select(`g#g-${this.id}-axis-y`)
      .transition()
      .duration(500)
      .call(this.axisY);

      d3.select(`g#g-${this.id}-axis-y`)
        .selectAll('line')
        .attr('stroke', (d: any) => d === 0 ? '#000' : '#cecece')
        .attr('stroke-dasharray', '2,2');
      
      // *** update bars *** //
      d3.select(`g#g-${this.id}-bars`)
        .selectAll('rect')
        .data(data)
        .join('rect')
        .attr('class', `bars-${this.id}`)
        .attr('id', (d, i) => `bar-${this.id}-${i}`)
        .attr('fill', (d: any, i: any) => this.colors(d.ISO3))
        .attr('x', (d) => this.scaleX(d.ISO3))
        .attr('width', this.scaleX.bandwidth())
        .attr('y', (d) => this.scaleY(+d.PERSONS_FULLY_VACCINATED))
        .attr('height', (d) => 
          this.height - this.margin.bottom - this.scaleY(+d.PERSONS_FULLY_VACCINATED))
        /* .transition()
        .delay((d: any, i: any) => i * 50)
        .duration(200) */

    this.svg.call(this.zoom);
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
      .selectAll(`.bars-${this.id}`)
        .on('click', (event) => {
          const target = d3.select(event.target);
          mouseClick(target);
        })
        .on('mousemove', (event, d: any) => {
          const { offsetX, offsetY } = event;
          const isLeft = offsetX < this.width / 2;
          const isTop = offsetY < this.height / 2;
          const { height: tipHeight, width: tipWidth } = 
            document.querySelector<any>('#tooltip').getBoundingClientRect();

          d3.select(event.target)
            .style('cursor', 'pointer')
            .style('opacity', 0.86);

          d3.select('#tooltip')
            .style('position', 'absolute')
            .style('background-color', '#0c0101e3')
            .style('color', '#ccc')
            .style('border', `1px solid ${this.colors(d.ISO3)}`)
            .style('border-radius', '5px')
            .style('box-shadow', '0 0 5px #000')
            .style('padding', '10px')
            .style('top', `${isTop ? event.pageY + 20 : event.pageY - tipHeight - 10}px`)
            .style('left', `${isLeft ? event.pageX + 20 : event.pageX - tipWidth - 20}px`)
            .transition()
            .duration(400)
            .style('opacity', 0.91);

          d3.select('#tooltip-text')
            .html(`
            <div style="width: 12px; height:12px; margin-right: .25rem; 
            background: ${this.colors(d.ISO3)};"></div> 
              País: ${d.COUNTRY} (<b>${d.ISO3}</b>)
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

  // *** create function zoom *** //
  zoom = (svg: any) => {
    console.log('zoom', svg);
    
    const extent = [
      [this.margin.left, this.margin.top],
      [this.width - this.margin.rigtht, this.height - this.margin.top],
    ] as any;

    const zoomed = (event: any) => {
      const { transform } = event;
      this.scaleX.range([this.margin.left, this.width - this.margin.rigtht]
        .map((d) => transform.applyX(d)));
        
      svg.select(`g#g-${this.id}-bars`)
        .selectAll(`.bars-${this.id}`)
        .attr('x', (d: any) => this.scaleX(d.ISO3))
        .attr('width', this.scaleX.bandwidth());

      svg.select(`g#g-${this.id}-axis-x`)
        .call(this.axisX);
    }

    svg.call(d3.zoom()
      .scaleExtent([1, 8])
      .translateExtent(extent)
      .extent(extent)
      .on('zoom', zoomed)
    );
  }

  // *** create function filter data *** //
  filterData = (data: any, filter: string): void => {
    const filtered = data.filter((d: any) => d.WHO_REGION === filter
      && d.PERSONS_FULLY_VACCINATED > 0);

    const arrayLength = filtered.length > 30
      ? // filtra apenas os 30 com maior vicinação
        filtered
          .sort((a: any, b: any) => b.PERSONS_FULLY_VACCINATED - a.PERSONS_FULLY_VACCINATED)
          .slice(0, 30)
      : // filtrar todos
        filtered;
    
    this.updateChart(arrayLength);
    this.interativeEvents();
  }

  selectFilter(data: any[]): void {
    console.log('selectFilter', data);
    
    const selected = d3.select(`#select-option`)
      .append('select')
      .attr('id', `select-${this.id}`)
      .attr('class', 'select');

    const uniqueValue = [...new Set(data.map((d: any) => d.WHO_REGION))];

    selected.selectAll('option')
      .data(uniqueValue)
      .join('option')
      .attr('value', (d: any) => {
        return d.length ? d : 'Todos';
      })
      .text((d: any) => d);

    selected.on('change', () => {
      
      this.filterData(data, selected.property('value'));
      // console.log(selected.property('value'));
    })
    
  }

  // *** create legend in axis Y *** //
  legendY(): void {
    d3.select(`g#g-${this.id}-legend`)
      .append('g')
      .append('text')
      .attr('class', 'legend')
      .attr('x', this.margin.left)
      .attr('y', this.margin.top)
      .attr('fill', '#000')
      .style('opacity', 0.7)
      .attr('pointer-events', 'none')
      .attr('text-anchor', 'middle')
      .attr('transform', `translate(${this.margin.left + 25}, ${this.margin.top - 15}) rotate(90)`)
      .text('Em milhões');
  }

  seeAll(): void {
    this.updateChart(this.data);
    this.interativeEvents();
  }
}
