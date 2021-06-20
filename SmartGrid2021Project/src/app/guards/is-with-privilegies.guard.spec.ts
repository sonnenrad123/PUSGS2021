import { TestBed } from '@angular/core/testing';

import { IsWithPrivilegiesGuard } from './is-with-privilegies.guard';

describe('IsWithPrivilegiesGuard', () => {
  let guard: IsWithPrivilegiesGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IsWithPrivilegiesGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
