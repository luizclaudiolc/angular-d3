import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NodesEndLinksComponent } from './nodes-end-links.component';

describe('NodesEndLinksComponent', () => {
  let component: NodesEndLinksComponent;
  let fixture: ComponentFixture<NodesEndLinksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NodesEndLinksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NodesEndLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
