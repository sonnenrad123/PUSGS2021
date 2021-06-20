import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPlanEquipmentComponent } from './add-plan-equipment.component';

describe('AddPlanEquipmentComponent', () => {
  let component: AddPlanEquipmentComponent;
  let fixture: ComponentFixture<AddPlanEquipmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPlanEquipmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPlanEquipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
