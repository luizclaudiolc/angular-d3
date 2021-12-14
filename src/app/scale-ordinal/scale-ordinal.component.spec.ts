import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScaleOrdinalComponent } from './scale-ordinal.component';

describe('ScaleOrdinalComponent', () => {
  let component: ScaleOrdinalComponent;
  let fixture: ComponentFixture<ScaleOrdinalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScaleOrdinalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScaleOrdinalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
