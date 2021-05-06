import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SafetyDocumentMultimediaAttachmentsComponent } from './safety-document-multimedia-attachments.component';

describe('SafetyDocumentMultimediaAttachmentsComponent', () => {
  let component: SafetyDocumentMultimediaAttachmentsComponent;
  let fixture: ComponentFixture<SafetyDocumentMultimediaAttachmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SafetyDocumentMultimediaAttachmentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SafetyDocumentMultimediaAttachmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
