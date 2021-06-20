import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPlanWorkInstructionsComponent } from './add-plan-work-instructions.component';

describe('AddPlanWorkInstructionsComponent', () => {
  let component: AddPlanWorkInstructionsComponent;
  let fixture: ComponentFixture<AddPlanWorkInstructionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPlanWorkInstructionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPlanWorkInstructionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
