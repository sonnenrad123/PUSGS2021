import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSafetyDocumentComponent } from './add-safety-document.component';

describe('AddSafetyDocumentComponent', () => {
  let component: AddSafetyDocumentComponent;
  let fixture: ComponentFixture<AddSafetyDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSafetyDocumentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSafetyDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
