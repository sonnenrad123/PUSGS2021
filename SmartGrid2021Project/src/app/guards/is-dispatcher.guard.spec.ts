import { TestBed } from '@angular/core/testing';

import { IsDispatcherGuard } from './is-dispatcher.guard';

describe('IsDispatcherGuard', () => {
  let guard: IsDispatcherGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IsDispatcherGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
