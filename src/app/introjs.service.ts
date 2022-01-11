import { Injectable } from '@angular/core';
import * as introJs from 'intro.js';

@Injectable({
  providedIn: 'root'
})
export class IntrojsService {

  public introJS: any = null;

  public t1(): void {
    this.introJS = introJs();
    this.introJS.start();

    this.introJS.setOptions({
      nextLabel: 'Próximo',
      prevLabel: 'Anterior',
      skipLabel: 'x',
      doneLabel: 'Fim',
      // showButtons: false,
      // showProgress: true,
      // showBullets: false,
      // overlayOpacity: 0.8,
      // scrollPadding:
      steps: [
        {
          element: document.querySelector('.title'),
          intro: 'Bem-vindo ao curso de introdução ao D3.js!',
        },
        {
          element: document.querySelector('.txt'),
          intro: 'Welcome to the <b>Angular</b> <b>IntroJS</b> Demo',
          position: 'top'
        },
        {
          element: document.querySelector('#txt'),
          intro: 'Nome da curva',
          position: 'top'
        },
        {
          element: document.querySelector('#point-7'),
          intro: 'Ponto da curva',
          position: 'bottom'
        },
        {
          element: document.querySelector('.btn-primary'),
          intro: 'Click para mudar a curva',
          position: 'top'
        },
        {
          element: document.querySelector('#line'),
          intro: 'Curva de exemplo',
          position: 'right'
        }
      ]
    }).start();
  }
  

  constructor() { }
}
