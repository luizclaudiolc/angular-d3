import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArcPieGeneratorComponent } from './pages/arc-pie-generator/arc-pie-generator.component';
import { CovidCasesComponent } from './pages/covid-cases/covid-cases.component';
import { LineGeneratorComponent } from './pages/line-generator/line-generator.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'bar',
    component: CovidCasesComponent,
  },
  {
    path: 'pie',
    component: ArcPieGeneratorComponent,
  },
  {
    path: 'line',
    component: LineGeneratorComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
