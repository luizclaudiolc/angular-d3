import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderProjectComponent } from './slider-project.component';

describe('SliderProjectComponent', () => {
  let component: SliderProjectComponent;
  let fixture: ComponentFixture<SliderProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SliderProjectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SliderProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
