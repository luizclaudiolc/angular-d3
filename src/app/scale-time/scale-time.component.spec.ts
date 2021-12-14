import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScaleTimeComponent } from './scale-time.component';

describe('ScaleTimeComponent', () => {
  let component: ScaleTimeComponent;
  let fixture: ComponentFixture<ScaleTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScaleTimeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScaleTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
