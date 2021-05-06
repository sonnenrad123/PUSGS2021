import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SafetyDocumentBasicInfoComponent } from './safety-document-basic-info.component';

describe('SafetyDocumentBasicInfoComponent', () => {
  let component: SafetyDocumentBasicInfoComponent;
  let fixture: ComponentFixture<SafetyDocumentBasicInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SafetyDocumentBasicInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SafetyDocumentBasicInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
