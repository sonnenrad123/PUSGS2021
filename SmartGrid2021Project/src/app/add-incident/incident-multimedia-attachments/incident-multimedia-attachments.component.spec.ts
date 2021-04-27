import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentMultimediaAttachmentsComponent } from './incident-multimedia-attachments.component';

describe('IncidentMultimediaAttachmentsComponent', () => {
  let component: IncidentMultimediaAttachmentsComponent;
  let fixture: ComponentFixture<IncidentMultimediaAttachmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncidentMultimediaAttachmentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncidentMultimediaAttachmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
