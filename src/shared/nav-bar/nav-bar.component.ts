import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { fromEvent, tap } from 'rxjs';
import { ItensMenu } from '../interfaces/itens-menu';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  itemsMenuBars: ItensMenu[] = [
    {
      label: 'Barra Vertical',
      icon: 'bar_chart',
      link: '/barras-verticais'
    },
    {
      label: 'Barra Horizontal',
      icon: 'storage',
      link: '/barras-horizontais'
    },
  ];

  itemsMenuPie: ItensMenu[] = [
    {
      label: 'Grafico de Pizza',
      icon: 'pie_chart',
      link: '/grafico-pizza'
    },
  ];

  itemsMenuLine: ItensMenu[] = [
    {
      label: 'Grafico de Linha',
      icon: 'show_chart',
      link: '/grafico-linha'
    },
  ];

  itemsMenuPlot: ItensMenu[] = [
    {
      label: 'Grafico de Scatter',
      icon: 'show_chart',
      link: '/grafico-scatter'
    },
  ];

  itemsMenuBubble: ItensMenu[] = [
    {
      label: 'Grafico de Bubble',
      icon: 'bubble_chart',
      link: '/bubble-chart'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  
  }

}
