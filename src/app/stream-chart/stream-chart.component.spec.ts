import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StreamChartComponent } from './stream-chart.component';

describe('StreamChartComponent', () => {
  let component: StreamChartComponent;
  let fixture: ComponentFixture<StreamChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StreamChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StreamChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
