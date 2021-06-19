import { TestBed } from '@angular/core/testing';
import { SwitchingPlanService } from './switching-plan.service';



describe('SwitchingPlanService', () => {
  let service: SwitchingPlanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SwitchingPlanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});