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
import { SliderProjectComponent } from './slider-project/slider-project.component';
import { ScalesComponent } from './scales/scales.component';
import { ScaleOrdinalComponent } from './scale-ordinal/scale-ordinal.component';
import { DivergingScalesComponent } from './diverging-scales/diverging-scales.component';
import { ScaleTimeComponent } from './scale-time/scale-time.component';
import { AxisGeneratorComponent } from './axis-generator/axis-generator.component';
import { AnimationsComponentComponent } from './animations-component/animations-component.component';
import { BubbleCharComponent } from './bubble-char/bubble-char.component';
import { NodesEndLinksComponent } from './nodes-end-links/nodes-end-links.component';
import { SimulationChallengeComponent } from './simulation-challenge/simulation-challenge.component';
import { LineGeneratorComponent } from './line-generator/line-generator.component';
import { CovidCasesComponent } from './covid-cases/covid-cases.component';
import { AreaGeneratorComponent } from './area-generator/area-generator.component';
import { ArcPieGeneratorComponent } from './arc-pie-generator/arc-pie-generator.component';

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
    EventHandlingComponent,
    SliderProjectComponent,
    ScalesComponent,
    ScaleOrdinalComponent,
    DivergingScalesComponent,
    ScaleTimeComponent,
    AxisGeneratorComponent,
    AnimationsComponentComponent,
    BubbleCharComponent,
    NodesEndLinksComponent,
    SimulationChallengeComponent,
    LineGeneratorComponent,
    CovidCasesComponent,
    AreaGeneratorComponent,
    ArcPieGeneratorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
