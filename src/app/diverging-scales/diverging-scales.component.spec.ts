import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DivergingScalesComponent } from './diverging-scales.component';

describe('DivergingScalesComponent', () => {
  let component: DivergingScalesComponent;
  let fixture: ComponentFixture<DivergingScalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DivergingScalesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DivergingScalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
