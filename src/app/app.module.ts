import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from '@angular/cdk/layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavBarComponent } from '../shared/nav-bar/nav-bar.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import { HeaderComponent } from '../shared/header/header.component';
import { BarComponent } from './pages/bar/bar.component';
import { PieComponent } from './pages/pie/pie.component';
import { AnimationsComponentComponent } from './pages/animations-component/animations-component.component';
import { ApparencesAtrrinutesComponent } from './pages/apparences-atrrinutes/apparences-atrrinutes.component';
import { ArcPieGeneratorComponent } from './pages/arc-pie-generator/arc-pie-generator.component';
import { AreaGeneratorComponent } from './pages/area-generator/area-generator.component';
import { AxisGeneratorComponent } from './pages/axis-generator/axis-generator.component';
import { BubbleCharComponent } from './pages/bubble-char/bubble-char.component';
import { CovidCasesComponent } from './pages/covid-cases/covid-cases.component';
import { DataVsDatumComponent } from './pages/data-vs-datum/data-vs-datum.component';
import { DivergingScalesComponent } from './pages/diverging-scales/diverging-scales.component';
import { DraggingComponent } from './pages/dragging/dragging.component';
import { EventHandlingComponent } from './pages/event-handling/event-handling.component';
import { HistogranComponent } from './pages/histogran/histogran.component';
import { LineGeneratorComponent } from './pages/line-generator/line-generator.component';
import { LinksAndLayoutsComponent } from './pages/links-and-layouts/links-and-layouts.component';
import { NodesEndLinksComponent } from './pages/nodes-end-links/nodes-end-links.component';
import { PathsComponent } from './pages/paths/paths.component';
import { ScaleOrdinalComponent } from './pages/scale-ordinal/scale-ordinal.component';
import { ScaleTimeComponent } from './pages/scale-time/scale-time.component';
import { ScalesComponent } from './pages/scales/scales.component';
import { ScatterComponent } from './pages/scatter/scatter.component';
import { ShapesComponent } from './pages/shapes/shapes.component';
import { SimulationChallengeComponent } from './pages/simulation-challenge/simulation-challenge.component';
import { SliderProjectComponent } from './pages/slider-project/slider-project.component';
import { SmileComponent } from './pages/smile/smile.component';
import { StacksComponentComponent } from './pages/stacks-component/stacks-component.component';
import { StatisticalFunctionsComponent } from './pages/statistical-functions/statistical-functions.component';
import { StreamChartComponent } from './pages/stream-chart/stream-chart.component';
import { SymbolGeneratorComponent } from './pages/symbol-generator/symbol-generator.component';
import { TextElementsComponent } from './pages/text-elements/text-elements.component';
import { TextOnPathComponent } from './pages/text-on-path/text-on-path.component';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ZoomComponent } from './pages/zoom/zoom.component';

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
    LinksAndLayoutsComponent,
    SymbolGeneratorComponent,
    StacksComponentComponent,
    StreamChartComponent,
    NavBarComponent,
    HeaderComponent,
    ZoomComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    FlexLayoutModule,
    MatMenuModule,
    MatDividerModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
