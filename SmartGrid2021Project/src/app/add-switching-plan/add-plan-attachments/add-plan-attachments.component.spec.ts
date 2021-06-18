import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPlanAttachmentsComponent } from './add-plan-attachments.component';

describe('AddPlanAttachmentsComponent', () => {
  let component: AddPlanAttachmentsComponent;
  let fixture: ComponentFixture<AddPlanAttachmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPlanAttachmentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPlanAttachmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
