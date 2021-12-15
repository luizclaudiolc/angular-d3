import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AxisGeneratorComponent } from './axis-generator.component';

describe('AxisGeneratorComponent', () => {
  let component: AxisGeneratorComponent;
  let fixture: ComponentFixture<AxisGeneratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AxisGeneratorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AxisGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
