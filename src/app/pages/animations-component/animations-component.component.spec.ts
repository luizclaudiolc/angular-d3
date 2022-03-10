import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimationsComponentComponent } from './animations-component.component';

describe('AnimationsComponentComponent', () => {
  let component: AnimationsComponentComponent;
  let fixture: ComponentFixture<AnimationsComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnimationsComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimationsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
