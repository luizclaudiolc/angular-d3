import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApparencesAtrrinutesComponent } from './apparences-atrrinutes.component';

describe('ApparencesAtrrinutesComponent', () => {
  let component: ApparencesAtrrinutesComponent;
  let fixture: ComponentFixture<ApparencesAtrrinutesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApparencesAtrrinutesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApparencesAtrrinutesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
