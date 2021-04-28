import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentCallsNewCallComponent } from './incident-calls-new-call.component';

describe('IncidentCallsNewCallComponent', () => {
  let component: IncidentCallsNewCallComponent;
  let fixture: ComponentFixture<IncidentCallsNewCallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncidentCallsNewCallComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncidentCallsNewCallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
