import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticalFunctionsComponent } from './statistical-functions.component';

describe('StatisticalFunctionsComponent', () => {
  let component: StatisticalFunctionsComponent;
  let fixture: ComponentFixture<StatisticalFunctionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatisticalFunctionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticalFunctionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
