import { TestBed } from '@angular/core/testing';

import { StreetPriorityService } from './street-priority.service';

describe('StreetPriorityService', () => {
  let service: StreetPriorityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StreetPriorityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
