import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinksAndLayoutsComponent } from './links-and-layouts.component';

describe('LinksAndLayoutsComponent', () => {
  let component: LinksAndLayoutsComponent;
  let fixture: ComponentFixture<LinksAndLayoutsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinksAndLayoutsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LinksAndLayoutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
