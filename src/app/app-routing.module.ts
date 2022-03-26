import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArcPieGeneratorComponent } from './pages/arc-pie-generator/arc-pie-generator.component';
import { BubbleCharComponent } from './pages/bubble-char/bubble-char.component';
import { CovidCasesComponent } from './pages/covid-cases/covid-cases.component';
import { LineGeneratorComponent } from './pages/line-generator/line-generator.component';
import { ScaleOrdinalComponent } from './pages/scale-ordinal/scale-ordinal.component';
import { ScatterComponent } from './pages/scatter/scatter.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'barras-verticais',
    component: CovidCasesComponent,
  },
  {
    path: 'barras-horizontais',
    component: ScaleOrdinalComponent,
  },
  {
    path: 'grafico-pizza',
    component: ArcPieGeneratorComponent,
  },
  {
    path: 'grafico-linha',
    component: LineGeneratorComponent,
  },
  {
    path: 'grafico-scatter',
    component: ScatterComponent,
  },
  {
    path: 'bubble-chart',
    component: BubbleCharComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
