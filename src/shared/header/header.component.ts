import { Component, OnInit } from '@angular/core';
import { ItensMenu } from '../interfaces/itens-menu';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
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

  constructor() { }

  ngOnInit(): void {
  }

}
