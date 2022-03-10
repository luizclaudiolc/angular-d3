import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextElementsComponent } from './text-elements.component';

describe('TextElementsComponent', () => {
  let component: TextElementsComponent;
  let fixture: ComponentFixture<TextElementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextElementsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextElementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
