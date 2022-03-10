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

  itensMenu: ItensMenu[] = [
    {
      label: 'Home',
      icon: 'home',
      link: '/bar',
    },
    {
      label: 'Entrar',
      icon: 'login',
      link: '/pie',
    },
    {
      label: 'Sair',
      icon: 'logout',
      link: '/line',
    }
  ];

  constructor() { }

  ngOnInit(): void {
  
  }

}
