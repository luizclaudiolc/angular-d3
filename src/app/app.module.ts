import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BarComponent } from './bar/bar.component';
import { PieComponent } from './pie/pie.component';
import { ScatterComponent } from './scatter/scatter.component';
import { ShapesComponent } from './shapes/shapes.component';
import { PathsComponent } from './paths/paths.component';
import { ApparencesAtrrinutesComponent } from './apparences-atrrinutes/apparences-atrrinutes.component';
import { TextElementsComponent } from './text-elements/text-elements.component';

@NgModule({
  declarations: [
    AppComponent,
    BarComponent,
    PieComponent,
    ScatterComponent,
    ShapesComponent,
    PathsComponent,
    ApparencesAtrrinutesComponent,
    TextElementsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
