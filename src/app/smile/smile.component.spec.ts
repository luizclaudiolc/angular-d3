import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmileComponent } from './smile.component';

describe('SmileComponent', () => {
  let component: SmileComponent;
  let fixture: ComponentFixture<SmileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SmileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
