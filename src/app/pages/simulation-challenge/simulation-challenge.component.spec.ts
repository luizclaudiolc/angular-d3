import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulationChallengeComponent } from './simulation-challenge.component';

describe('SimulationChallengeComponent', () => {
  let component: SimulationChallengeComponent;
  let fixture: ComponentFixture<SimulationChallengeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimulationChallengeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SimulationChallengeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
