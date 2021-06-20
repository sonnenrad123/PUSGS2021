import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPlanStateChangeHistoryComponent } from './add-plan-state-change-history.component';

describe('AddPlanStateChangeHistoryComponent', () => {
  let component: AddPlanStateChangeHistoryComponent;
  let fixture: ComponentFixture<AddPlanStateChangeHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPlanStateChangeHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPlanStateChangeHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
