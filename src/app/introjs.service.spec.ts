import { TestBed } from '@angular/core/testing';

import { IntrojsService } from './introjs.service';

describe('IntrojsService', () => {
  let service: IntrojsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IntrojsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
