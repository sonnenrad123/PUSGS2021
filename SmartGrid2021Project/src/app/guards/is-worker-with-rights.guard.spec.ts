import { TestBed } from '@angular/core/testing';

import { IsWorkerWithRightsGuard } from './is-worker-with-rights.guard';

describe('IsWorkerWithRightsGuard', () => {
  let guard: IsWorkerWithRightsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IsWorkerWithRightsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
