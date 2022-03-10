import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistogranComponent } from './histogran.component';

describe('HistogranComponent', () => {
  let component: HistogranComponent;
  let fixture: ComponentFixture<HistogranComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistogranComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistogranComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
