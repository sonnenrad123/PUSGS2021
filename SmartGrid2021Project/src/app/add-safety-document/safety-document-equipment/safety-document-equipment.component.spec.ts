import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SafetyDocumentEquipmentComponent } from './safety-document-equipment.component';

describe('SafetyDocumentEquipmentComponent', () => {
  let component: SafetyDocumentEquipmentComponent;
  let fixture: ComponentFixture<SafetyDocumentEquipmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SafetyDocumentEquipmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SafetyDocumentEquipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
