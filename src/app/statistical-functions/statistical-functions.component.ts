import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-statistical-functions',
  templateUrl: './statistical-functions.component.html',
  styleUrls: ['./statistical-functions.component.scss']
})
export class StatisticalFunctionsComponent implements OnInit {
  private svg: any;
  private margins = {
    margin: 50,
    width: 750,
    height: 500
  };
  private data = [5, 16, 18, 12, 13, 55, 14, 16, 14, 24, 17, 17, 1, 18, 22, 50, 75];
  private dataset = [{a: 1, b: 5}, {a: 2, b: 6}, {a: 3, b: 7}];

  private drawChart(): void {
    this.svg = d3.select('#statistical')
      .append('svg')
      .style('background-color', '#f5f5')
      .attr('width', this.margins.width)
      .attr('height', this.margins.height)
      .append('g')
      .attr('transform', `translate(${this.margins.margin}, ${this.margins.margin})`);
  }

  private createText(): void {
    this.svg
      .append('text')
      .style('font-size', '20px')
      .style('font-weight', 'bold')
      .attr('class', 'text')
      .text(this.data.join(', '));

    let data;

    data = d3.min(this.data); // returns the minimum value in the array

    d3.select('g')
      .append('text')
      .attr('x', 0)
      .attr('y', 40)
      .style('font-size', '20px')
      .style('font-weight', 'bold')
      .text(`Min: ${data}`);

    data = d3.max(this.dataset, d => d.b); // metodo para pegar o maior valor de um array de objetos

    d3.select('g')
      .append('text')
      .attr('x', 0)
      .attr('y', 80)
      .style('font-size', '20px')
      .style('font-weight', 'bold')
      .text(`Max: ${data}`);

    data = d3.mean(this.data);

    d3.select('g')
      .append('text')
      .attr('x', 0)
      .attr('y', 120)
      .style('font-size', '20px')
      .style('font-weight', 'bold')
      .text(`Mean: ${Number(data).toFixed(2)}`);

    data = d3.median(this.data); // metodo para pegar o valor medio de um array

    d3.select('g')
      .append('text')
      .attr('x', 0)
      .attr('y', 160)
      .style('font-size', '20px')
      .style('font-weight', 'bold')
      .text(`Median: ${data}`);

    data = d3.extent(this.data); // retorna um array com o menor e o maior valor

    d3.select('g')
      .append('text')
      .attr('x', 0)
      .attr('y', 200)
      .style('font-size', '20px')
      .style('font-weight', 'bold')
      .text(`Extent: ${data}`);

    data = d3.sum(this.data); // soma todos os valores de um array

    d3.select('g')
      .append('text')
      .attr('x', 0)
      .attr('y', 240)
      .style('font-size', '20px')
      .style('font-weight', 'bold')
      .text(`Sum: ${data}`);

    data = d3.quantile(this.data, 0.5); // retorna o valor do quartil

    d3.select('g')
      .append('text')
      .attr('x', 0)
      .attr('y', 280)
      .style('font-size', '20px')
      .style('font-weight', 'bold')
      .text(`Quantile: ${data}`);

    data = d3.variance(this.data); // retorna a variancia

    d3.select('g')
      .append('text')
      .attr('x', 0)
      .attr('y', 320)
      .style('font-size', '20px')
      .style('font-weight', 'bold')
      .text(`Variance: ${data}`);

    data = d3.deviation(this.data); // retorna a desvio padrao

    d3.select('g')
      .append('text')
      .attr('x', 0)
      .attr('y', 360)
      .style('font-size', '20px')
      .style('font-weight', 'bold')
      .text(`Deviation: ${data}`);

    data = d3.shuffle(this.data); // embaralha os valores de um array

    d3.select('g')
      .append('text')
      .attr('x', 0)
      .attr('y', 400)
      .style('font-size', '20px')
      .style('font-weight', 'bold')
      .text(`Shuffle: ${data}`);

    data = d3.merge([this.data, ['Luiz']]); // junta os valores de um array de objetos
    
    d3.select('g')
      .append('text')
      .attr('x', 0)
      .attr('y', 430)
      .style('font-size', '20px')
      .style('font-weight', 'bold')
      .text(`Merge: ${data}`);
  }

  constructor() { }

  ngOnInit(): void {
    this.drawChart();
    this.createText();
  }

}
