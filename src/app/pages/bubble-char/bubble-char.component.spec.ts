import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BubbleCharComponent } from './bubble-char.component';

describe('BubbleCharComponent', () => {
  let component: BubbleCharComponent;
  let fixture: ComponentFixture<BubbleCharComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BubbleCharComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BubbleCharComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
