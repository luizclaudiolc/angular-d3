import { Component, Output } from '@angular/core';
import { GenerateUuidService } from 'src/utils/generate-uuid.service';
import { CompactType, GridsterConfig, GridsterItem, GridType }  from 'angular-gridster2';

const options = {
  compactType: CompactType.None,
  draggable: {
    enabled: true,
    ignoreContent: true,
    dragHandleClass: 'gridster-drag-handle',
    ignoreContentClass: 'gridster-ignore-content',
  },
  fixedRowHeight: 80,
  fixedColWidth: 24,
  gridType: GridType.VerticalFixed,
  keepFixedHeightInMobile: true,
  keepFixedWidthInMobile: false,
  margin: 16,
  maxCols: 12,
  minCols: 12,
  mobileBreakpoint: 640,
  outerMargin: true,
  resizable: {
    enabled: true,
  },
  useTransformPositioning: true,
};

const gridster = [
  {
    index: 0,
    cols: 3,
    rows: 2.75,
    x: 0,
    y: 0,
    minItemCols: 2,
    minItemRows: 2,
    id: 'card-01',
    title: 'Volumetria Total',
    // view: 'chart',
  },
  /* {
    cols: 1,
    rows: 1,
    y: 0,
    x: 1,
    title: 'Line',
  }, */
];
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private makeId: GenerateUuidService) {}
  title = 'angular-d3';

  public options: any;
  public dashboard: Array<GridsterItem> | undefined;

  ngOnInit() {
    this.options = options;
    this.dashboard = gridster;
  }
}
