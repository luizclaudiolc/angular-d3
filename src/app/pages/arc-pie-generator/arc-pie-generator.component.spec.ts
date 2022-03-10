import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArcPieGeneratorComponent } from './arc-pie-generator.component';

describe('ArcPieGeneratorComponent', () => {
  let component: ArcPieGeneratorComponent;
  let fixture: ComponentFixture<ArcPieGeneratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArcPieGeneratorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArcPieGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
