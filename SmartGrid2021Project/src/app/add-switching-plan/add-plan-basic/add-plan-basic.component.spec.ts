import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPlanBasicComponent } from './add-plan-basic.component';

describe('AddPlanBasicComponent', () => {
  let component: AddPlanBasicComponent;
  let fixture: ComponentFixture<AddPlanBasicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPlanBasicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPlanBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
