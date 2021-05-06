import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SafetyDocumentStatesHistoryComponent } from './safety-document-states-history.component';

describe('SafetyDocumentStatesHistoryComponent', () => {
  let component: SafetyDocumentStatesHistoryComponent;
  let fixture: ComponentFixture<SafetyDocumentStatesHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SafetyDocumentStatesHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SafetyDocumentStatesHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
