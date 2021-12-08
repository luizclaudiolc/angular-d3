import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataVsDatumComponent } from './data-vs-datum.component';

describe('DataVsDatumComponent', () => {
  let component: DataVsDatumComponent;
  let fixture: ComponentFixture<DataVsDatumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataVsDatumComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataVsDatumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
