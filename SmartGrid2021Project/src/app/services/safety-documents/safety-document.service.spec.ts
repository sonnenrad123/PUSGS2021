import { TestBed } from '@angular/core/testing';

import { SafetyDocumentService } from './safety-document.service';

describe('SafetyDocumentService', () => {
  let service: SafetyDocumentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SafetyDocumentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
