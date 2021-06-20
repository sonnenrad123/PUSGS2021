import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectSwitchingPlanModalDialogComponent } from './select-switching-plan-modal-dialog.component';

describe('SelectSwitchingPlanModalDialogComponent', () => {
  let component: SelectSwitchingPlanModalDialogComponent;
  let fixture: ComponentFixture<SelectSwitchingPlanModalDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectSwitchingPlanModalDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectSwitchingPlanModalDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
