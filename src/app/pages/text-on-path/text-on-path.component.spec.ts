import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextOnPathComponent } from './text-on-path.component';

describe('TextOnPathComponent', () => {
  let component: TextOnPathComponent;
  let fixture: ComponentFixture<TextOnPathComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextOnPathComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextOnPathComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
