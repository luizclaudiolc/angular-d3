import { Component, OnInit } from '@angular/core';
import { ItensMenu } from '../interfaces/itens-menu';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  itensMenu: ItensMenu[] = [
    {
      label: 'Entrar',
      icon: 'login'
    },
    {
      label: 'Bar',
      icon: '3d_rotation',
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
