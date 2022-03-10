import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SymbolGeneratorComponent } from './symbol-generator.component';

describe('SymbolGeneratorComponent', () => {
  let component: SymbolGeneratorComponent;
  let fixture: ComponentFixture<SymbolGeneratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SymbolGeneratorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SymbolGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
