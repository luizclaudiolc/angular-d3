import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-links-and-layouts',
  templateUrl: './links-and-layouts.component.html',
  styleUrls: ['./links-and-layouts.component.scss'],
})
export class LinksAndLayoutsComponent implements OnInit {
  private svg: any;
  private margin = { top: 30, right: 30, bottom: 30, left: 40 };
  private width = 960;
  private height = 600;;
  private dataset = {
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
      // {
      //   name: 'D',
      //   children: [
      //     {
      //       name: 'D1',
      //       children: [
      //         {
      //           name: 'D11',
      //         },
      //         {
      //           name: 'D12',
      //         },
      //       ],
      //     },
      //   ],
      // }
    ],
  };

  private index = -1;

  private draw(): void {
    this.svg = d3.select('#links')
      .append('svg')
      .style('background-color', '#F6F8FA')
      .attr('width', this.width)
      .attr('height', this.height)
      .on('click', () => {
        this.index++;
        this.index > 4 ? this.index = -1 : null;

        if (this.index === 0) {
          verticalTree();
        } else if (this.index === 1) {
          verticalCluster();
        } else if (this.index === 2) {
          horizontalTree();
        } else if (this.index === 3) {
          horizontalCluster();
        } else if (this.index === 4) {
          radialTree();
        } else {
          radialCluster();
        }
      });

    const rootNode = d3.hierarchy(this.dataset, (d: any) => d.children);
    const g = this.svg.append('g')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);
    
    const links = g.append('g')
      .selectAll('path')
      .data(rootNode.links())
      .join(
        (enter: any) => enter.append('path'),
        (update: any) => update.attr('d', d3.linkHorizontal()),
        (exit: any) => exit.remove()
      )
      .attr('fill', 'none')
      .attr('stroke', 'gray');

    const dots = g.append('g')
      .selectAll('circle')
      .data(rootNode.descendants())
      .join(
        (enter: any) => enter.append('circle').attr('r', 5),
        (update: any) => update.attr('r', 5),
        (exit: any) => exit.remove()
      )
      .attr('fill', 'darkorange')
      .attr('stroke', '#000')
      .attr('stroke-width', 1);

    const labels = g.append('g')
      .selectAll('text')
      .data(rootNode.descendants())
      .join(
        (enter: any) => enter.append('text').attr('text-anchor', 'middle'),
        (update: any) => update.attr('text-anchor', 'middle'),
        (exit: any) => exit.remove()
      )

    const verticalTree = (): void => {
      g.transition().duration(1500)
        .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);

      const layout = d3.tree().size([this.width - (this.margin.left + this.margin.right),
        this.height - (this.margin.top + this.margin.bottom)]);
      
      layout(rootNode);

      links.data(rootNode.links()).transition().duration(1500)
        .attr('d', d3.linkVertical().x((d: any) => d.x).y((d: any) => d.y));

      dots.data(rootNode.descendants()).transition().duration(1500)
        .attr('cx', (d: any) => d.x)
        .attr('cy', (d: any) => d.y);

      labels.data(rootNode.descendants())
        .transition().duration(1500)
        .attr('x', (d: any) => d.x)
        .attr('y', (d: any) => d.y - 10)
        .text((d: any) => d.data.name);
    };

    const verticalCluster = (): void => {
      g.transition().duration(1500)
        .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);

      const layout = d3.cluster().size([this.width - (this.margin.left + this.margin.right),
        this.height - (this.margin.top + this.margin.bottom)]);
      
      layout(rootNode);

      links.data(rootNode.links()).transition().duration(1500)
        .attr('d', d3.linkVertical().x((d: any) => d.x).y((d: any) => d.y));

      dots.data(rootNode.descendants()).transition().duration(1500)
        .attr('cx', (d: any) => d.x)
        .attr('cy', (d: any) => d.y);

      labels.data(rootNode.descendants())
        .transition().duration(1500)
        .attr('x', (d: any) => d.x)
        .attr('y', (d: any) => d.y - 10)
        .text((d: any) => d.data.name);
    };

    const horizontalTree = (): void => {
      g.transition().duration(1500)
        .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);

      const layout = d3.tree().size([this.height - (this.margin.top + this.margin.bottom),
        this.width - (this.margin.left + this.margin.right)]);
      
      layout(rootNode);

      links.data(rootNode.links()).transition().duration(1500)
        .attr('d', d3.linkHorizontal().x((d: any) => d.y).y((d: any) => d.x));

      dots.data(rootNode.descendants()).transition().duration(1500)
        .attr('cx', (d: any) => d.y)
        .attr('cy', (d: any) => d.x);

      labels.data(rootNode.descendants())
        .transition().duration(1500)
        .attr('x', (d: any) => d.y)
        .attr('y', (d: any) => d.x - 10)
        .text((d: any) => d.data.name);
    };

    const horizontalCluster = (): void => {
      g.transition().duration(1500)
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);

      const layout = d3.cluster().size([this.height - (this.margin.top + this.margin.bottom),
        this.width - (this.margin.left + this.margin.right)]);
      
      layout(rootNode);

      links.data(rootNode.links()).transition().duration(1500)
        .attr('d', d3.linkHorizontal().x((d: any) => d.y).y((d: any) => d.x));

      dots.data(rootNode.descendants()).transition().duration(1500)
        .attr('cx', (d: any) => d.y)
        .attr('cy', (d: any) => d.x);

      labels.data(rootNode.descendants())
        .transition().duration(1500)
        .attr('x', (d: any) => d.y)
        .attr('y', (d: any) => d.x - 10)
        .text((d: any) => d.data.name);
    };

    const radialTree = (): void => {
      g.transition().duration(1500)
        .attr('transform', `translate(${this.width / 2}, ${this.height / 2})`);

      const layout = d3.tree().size([Math.PI * 2, this.height / 2 - (this.margin.top + this.margin.bottom)]);
      
      layout(rootNode);

      links.data(rootNode.links()).transition().duration(1500)
        .attr('d', d3.linkRadial().angle((d: any) => d.x).radius((d: any) => d.y));

      dots.data(rootNode.descendants()).transition().duration(1500)
        .attr('cx', (d: any) => radialPoints(d.x, d.y)[0])
        .attr('cy', (d: any) => radialPoints(d.x, d.y)[1]);

      labels.data(rootNode.descendants())
        .transition().duration(1500)
        .attr('x', (d: any) => radialPoints(d.x, d.y)[0])
        .attr('y', (d: any) => radialPoints(d.x, d.y)[1] - 10)
        .text((d: any) => d.data.name);
    };

    const radialPoints = (x: number, y: number): [number, number] => {
      return [
        y * Math.cos(x -= Math.PI / 2),
        y * Math.sin(x)
      ]
    };

    const radialCluster = (): void => {
      g.transition().duration(1500)
        .attr('transform', `translate(${this.width / 2}, ${this.height / 2})`);

      const layout = d3.cluster().size([Math.PI * 2, this.height / 2 - (this.margin.top + this.margin.bottom)]);
      
      layout(rootNode);

      links.data(rootNode.links()).transition().duration(1500)
        .attr('d', d3.linkRadial().angle((d: any) => d.x).radius((d: any) => d.y));

      dots.data(rootNode.descendants()).transition().duration(1500)
        .attr('cx', (d: any) => radialPoints(d.x, d.y)[0])
        .attr('cy', (d: any) => radialPoints(d.x, d.y)[1]);

      labels.data(rootNode.descendants())
        .transition().duration(1500)
        .attr('x', (d: any) => radialPoints(d.x, d.y)[0])
        .attr('y', (d: any) => radialPoints(d.x, d.y)[1] - 10)
        .text((d: any) => d.data.name);
    };

    d3.selectAll('circle')
    .on('mouseenter', function () {
      d3.select(this).transition().duration(250)
        .attr('fill', '#F6F8FA')
        .attr('stroke', 'black')
        .attr('stroke-width', '2px')
        .attr('r', 7.5);
    })
    .on('mouseleave', function () {
      d3.select(this).transition().duration(250)
      .attr('fill', 'darkorange')
      .attr('stroke', '#000')
      .attr('stroke-width', 1)
      .attr('r', 5);
    });
  };

  constructor() {}

  ngOnInit(): void {
    this.draw();
    console.log(this.dataset);
  }
}
