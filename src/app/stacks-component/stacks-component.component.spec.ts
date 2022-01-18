import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StacksComponentComponent } from './stacks-component.component';

describe('StacksComponentComponent', () => {
  let component: StacksComponentComponent;
  let fixture: ComponentFixture<StacksComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StacksComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StacksComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
