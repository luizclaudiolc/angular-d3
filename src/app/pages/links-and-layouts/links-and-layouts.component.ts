import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-links-and-layouts',
  templateUrl: './links-and-layouts.component.html',
  styleUrls: ['./links-and-layouts.component.scss'],
})
export class LinksAndLayoutsComponent implements OnInit {
  svg: any;
  margin = { top: 90, right: 90, bottom: 90, left: 90 };
  width = 960;
  height = 600;
  dataset = {
    name: 'Aparecida e Sebastião',
    children: [
      {
        name: 'Rosimeri',
        children: [
          {
            name: 'Lyncoln',
            children: [
              {
                name: 'Julia',
              },
            ],
          },
          {
            name: 'Levelyn',
            children: [
              {
                name: 'Vicente',
              },
            ],
          },
        ],
      },
      {
        name: 'Luiz Paulo',
        children: [
          {
            name: 'Stefany',
            children: [
              {
                name: 'Bernardo',
              },
            ],
          },
          {
            name: 'Sandy',
            children: [
              {
                name: 'Alice',
              },
            ],
          },
          {
            name: 'Shay',
            children: [
              {
                name: 'Luiz Gustavo',
              },
            ],
          },
          {
            name: 'L.Paulo',
          },
          
          {
            name: 'Saulo',
          },
          {
            name: 'Silas',
          },
        ],
      },
      {
        name: 'Ana Maria',
        children: [
          {
            name: 'Bruno',
          },
          {
            name: 'Hugo',
          },
          {
            name: 'Tiago',
          },
          {
            name: 'Diego',
            children: [
              {
                name: 'José',
              },
            ],
          },
          {
            name: 'Diogo',
          },
        ],
      },
    ],
  };
  rootNode: any;
  links: any;
  dots: any;
  labels: any;
  group: any;
  lineLength: any;

  // index= -1;

  constructor(@Inject (DOCUMENT) private document: Document) {}

  ngOnInit(): void {
    this.drawSvg();
    this.update();
    this.mouseEvents();
    console.log(this.dataset);
  }

  drawSvg(): void {
    this.svg = d3.select('#links')
      .append('svg')
      .style('background-color', '#F6F8FA')
      .attr('width', this.width)
      .attr('height', this.height)
      .attr('id', 'links-svg');

      d3.select('svg#links-svg').append('g').attr('id', 'links-g-container')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);
      d3.select('g#links-g-container').append('g').attr('id', 'links-g-path');
      d3.select('g#links-g-container').append('g').attr('id', 'links-g-circle');
      d3.select('g#links-g-container').append('g').attr('id', 'links-g-labels');
      d3.select('g#links-g-container').append('g').attr('id', 'links-g-group');

    // const radialTree = (): void => {
    //   g.transition().duration(1500)
    //     .attr('transform', `translate(${this.width / 2}, ${this.height / 2})`);

    //   const layout = d3.tree().size([Math.PI * 2, this.height / 2 - (this.margin.top + this.margin.bottom)]);
      
    //   layout(rootNode);

    //   links.data(rootNode.links()).transition().duration(1500)
    //     .attr('d', d3.linkRadial().angle((d: any) => d.x).radius((d: any) => d.y));

    //   dots.data(rootNode.descendants()).transition().duration(1500)
    //     .attr('cx', (d: any) => radialPoints(d.x, d.y)[0])
    //     .attr('cy', (d: any) => radialPoints(d.x, d.y)[1]);

    //   labels.data(rootNode.descendants())
    //     .transition().duration(1500)
    //     .attr('x', (d: any) => radialPoints(d.x, d.y)[0])
    //     .attr('y', (d: any) => radialPoints(d.x, d.y)[1] - 10)
    //     .text((d: any) => d.data.name);
    // };

    // const radialPoints = (x: number, y: number): [number, number] => {
    //   return [
    //     y * Math.cos(x -= Math.PI / 2),
    //     y * Math.sin(x)
    //   ]
    // };

    // const radialCluster = (): void => {
    //   g.transition().duration(1500)
    //     .attr('transform', `translate(${this.width / 2}, ${this.height / 2})`);

    //   const layout = d3.cluster().size([Math.PI * 2, this.height / 2 - (this.margin.top + this.margin.bottom)]);
      
    //   layout(rootNode);

    //   links.data(rootNode.links()).transition().duration(1500)
    //     .attr('d', d3.linkRadial().angle((d: any) => d.x).radius((d: any) => d.y));

    //   dots.data(rootNode.descendants()).transition().duration(1500)
    //     .attr('cx', (d: any) => radialPoints(d.x, d.y)[0])
    //     .attr('cy', (d: any) => radialPoints(d.x, d.y)[1]);

    //   labels.data(rootNode.descendants())
    //     .transition().duration(1500)
    //     .attr('x', (d: any) => radialPoints(d.x, d.y)[0])
    //     .attr('y', (d: any) => radialPoints(d.x, d.y)[1] - 10)
    //     .text((d: any) => d.data.name);
    // };

    // d3.selectAll('circle')
    // .on('mouseenter', function () {
    //   d3.select(this).transition().duration(250)
    //     .attr('fill', '#F6F8FA')
    //     .attr('stroke', 'black')
    //     .attr('stroke-width', '2px')
    //     .attr('r', 7.5);
    // })
    // .on('mouseleave', function () {
    //   d3.select(this).transition().duration(250)
    //   .attr('fill', 'darkorange')
    //   .attr('stroke', '#000')
    //   .attr('stroke-width', 1)
    //   .attr('r', 5);
    // });
  };

  update(): void {
    if (!Object.keys(this.dataset).length) return;

    // *** Updade svg dimensions *** //
    d3.select('links-svg')
      .attr('width', this.width)
      .attr('height', this.height);

    // *** Update hierarchy data *** //
    this.rootNode = d3.hierarchy(this.dataset, (d: any) => d.children);

    this.group = d3.select('#links-g-group').append('g')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);

    this.links = d3.select('#links-g-path').append('g')
      .selectAll('path')
      .data(this.rootNode.links())
      .join(
        (enter: any) => enter.append('path'),
        (update: any) => update.attr('d', d3.linkHorizontal()),
        (exit: any) => exit.remove()
      )
      .attr('fill', 'none')
      .attr('stroke', 'gray')
      .attr('id', (d: any) => `link-${d.target.data.name}`)

    this.dots = d3.select('#links-g-circle').append('g')
      .selectAll('circle')
      .data(this.rootNode.descendants())
      .join(
        (enter: any) => enter.append('circle'),
        (update: any) => update,
        (exit: any) => exit.remove()
        )
        .attr('r', 5)
        .attr('fill', 'darkorange')
        .attr('stroke', '#000')
        .attr('stroke-width', 1);
        
    this.labels = d3.select('#links-g-labels').append('g')
    .selectAll('text')
      .data(this.rootNode.descendants())
      .join(
        (enter: any) => enter.append('text').attr('text-anchor', 'middle'),
        (update: any) => update.attr('text-anchor', 'middle'),
        (exit: any) => exit.remove()
        );
  };

  verticalTree(): void {
    this.group.transition().duration(1500);
    
    const layout = d3.tree().size([this.width - (this.margin.left + this.margin.right),
      this.height - (this.margin.top + this.margin.bottom)]);

    layout(this.rootNode);
    
    this.links.data(this.rootNode.links())
      .transition().duration(1500)
      .attr('d', d3.linkVertical().x((d: any) => d.x).y((d: any) => d.y))
      .attr('id', (d: any, i: number) => `link-${i}`);

    this.dots.data(this.rootNode.descendants())
      .transition().duration(1500)
      .attr('cx', (d: any) => d.x)
      .attr('cy', (d: any) => d.y);
      
      this.labels.data(this.rootNode.descendants())
      .transition().duration(1500)
      .attr('x', (d: any) => d.x)
      .attr('y', (d: any) => d.y - 10)
      .text((d: any) => d.data.name);
  };

  verticalCluster(): void {
    this.group.transition().duration(1500);
    
    const layout = d3.cluster().size([this.width - (this.margin.left + this.margin.right),
      this.height - (this.margin.top + this.margin.bottom)]);

    layout(this.rootNode);
    
    this.links.data(this.rootNode.links())
      .transition().duration(1500)
      .attr('d', d3.linkVertical().x((d: any) => d.x).y((d: any) => d.y))
      .attr('id', (d: any, i: number) => `link-${i}`);

    this.dots.data(this.rootNode.descendants())
      .transition().duration(1500)
      .attr('cx', (d: any) => d.x)
      .attr('cy', (d: any) => d.y);
      
      this.labels.data(this.rootNode.descendants())
      .transition().duration(1500)
      .attr('x', (d: any) => d.x)
      .attr('y', (d: any) => d.y - 10)
      .text((d: any) => d.data.name);
  };

  horizontalTree(): void {
    this.group.transition().duration(1500);
    
    const layout = d3.tree().size([this.height - (this.margin.top + this.margin.bottom),
      this.width - (this.margin.left + this.margin.right)]);

    layout(this.rootNode);
    
    this.links.data(this.rootNode.links())
      .transition().duration(1500)
      .attr('d', d3.linkVertical().x((d: any) => d.y).y((d: any) => d.x))
      .attr('id', (d: any, i: number) => `link-${i}`);

    this.dots.data(this.rootNode.descendants())
      .transition().duration(1500)
      .attr('cx', (d: any) => d.y)
      .attr('cy', (d: any) => d.x);
      
      this.labels.data(this.rootNode.descendants())
      .transition().duration(1500)
      .attr('x', (d: any) => d.y)
      .attr('y', (d: any) => d.x - 10)
      .text((d: any) => d.data.name);
  };

  horizontalCluster(): void {
    this.group.transition().duration(1500);
    
    const layout = d3.cluster().size([this.height - (this.margin.top + this.margin.bottom),
      this.width - (this.margin.left + this.margin.right)]);

    layout(this.rootNode);
    
    this.links.data(this.rootNode.links())
      .transition().duration(1500)
      .attr('d', d3.linkVertical().x((d: any) => d.y).y((d: any) => d.x))
      .attr('id', (d: any, i: number) => `link-${i}`);

    this.dots.data(this.rootNode.descendants())
      .transition().duration(1500)
      .attr('cx', (d: any) => d.y)
      .attr('cy', (d: any) => d.x);
      
      this.labels.data(this.rootNode.descendants())
      .transition().duration(1500)
      .attr('x', (d: any) => d.y)
      .attr('y', (d: any) => d.x - 10)
      .text((d: any) => d.data.name);
  };

  radialTree(): void {
    this.group.transition().duration(1500)
    .attr('transform', `translate(${this.width / 2}, ${this.height / 2})`);
    
      const layout = d3.tree().size([Math.PI * 2, this.height / 2 - (this.margin.top + this.margin.bottom)]);
      
      layout(this.rootNode);

      this.links.data(this.rootNode.links()).transition().duration(1500)
        .attr('d', d3.linkRadial().angle((d: any) => d.x).radius((d: any) => d.y));

      this.dots.data(this.rootNode.descendants()).transition().duration(1500)
        .attr('cx', (d: any) => this.radialPoints(d.x, d.y)[0])
        .attr('cy', (d: any) => this.radialPoints(d.x, d.y)[1]);

      this.labels.data(this.rootNode.descendants())
        .transition().duration(1500)
        .attr('x', (d: any) => this.radialPoints(d.x, d.y)[0])
        .attr('y', (d: any) => this.radialPoints(d.x, d.y)[1] - 10)
        .text((d: any) => d.data.name);
  };

  mouseEvents(): void {
    let index = 0;
    this.svg
      .on('click', () => {
        // this.index++;
        index >= 5 ? index = 0 : null;
        const name = index === 0 ? 'verticalTree' 
          : index === 1 ? 'verticalCluster' 
          : index === 2 ?'horizontalTree'
          : index === 3 ? 'horizontalCluster'
          : 'radialTree';
        this[name]();

        console.log(this[name]);
        index++;
      }
    );
  };

  private radialPoints = (x: number, y: number): Array<number> => {
    return [
      y * Math.cos(x -= Math.PI / 2),
      y * Math.sin(x),
    ]
  };
}
