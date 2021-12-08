import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-histogran',
  templateUrl: './histogran.component.html',
  styleUrls: ['./histogran.component.scss']
})
export class HistogranComponent implements OnInit {
  private svg: any;
  private margins = {
    margin: 50,
    width: 750,
    height: 400,
  };
  private data = [5, 16, 18, 12, 13, 55, 14, 16, 14, 24, 17, 17, 1, 18, 22, 50, 75];

  private drawHistogran(): void {
    this.svg = d3.select('#histogran')
      .append('svg')
      // .style('background-color', '#f0f')
      .attr('width', this.margins.width)
      .attr('height', this.margins.height)
      .append('g')
      .attr('transform', `translate(${this.margins.margin},${this.margins.margin})`);

    let hist = d3.bin();
    // hist.value((d) => d)
    // hist.domain(d3.extent)
    const bins = hist(this.data);
    console.log(bins)
  }

  constructor() { }

  ngOnInit(): void {
    this.drawHistogran();
  }

}
