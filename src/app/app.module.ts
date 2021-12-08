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
import { SmileComponent } from './smile/smile.component';
import { TextOnPathComponent } from './text-on-path/text-on-path.component';
import { StatisticalFunctionsComponent } from './statistical-functions/statistical-functions.component';
import { HistogranComponent } from './histogran/histogran.component';
import { DataVsDatumComponent } from './data-vs-datum/data-vs-datum.component';
import { DraggingComponent } from './dragging/dragging.component';
import { EventHandlingComponent } from './event-handling/event-handling.component';

@NgModule({
  declarations: [
    AppComponent,
    BarComponent,
    PieComponent,
    ScatterComponent,
    ShapesComponent,
    PathsComponent,
    ApparencesAtrrinutesComponent,
    TextElementsComponent,
    SmileComponent,
    TextOnPathComponent,
    StatisticalFunctionsComponent,
    HistogranComponent,
    DataVsDatumComponent,
    DraggingComponent,
    EventHandlingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
