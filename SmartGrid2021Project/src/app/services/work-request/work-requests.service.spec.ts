import { TestBed } from '@angular/core/testing';

import { WorkRequestsService } from './work-requests.service';

describe('WorkRequestsService', () => {
  let service: WorkRequestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkRequestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
