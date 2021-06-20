import { TestBed } from '@angular/core/testing';

import { IsTeamMemberGuard } from './is-team-member.guard';

describe('IsTeamMemberGuard', () => {
  let guard: IsTeamMemberGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IsTeamMemberGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
