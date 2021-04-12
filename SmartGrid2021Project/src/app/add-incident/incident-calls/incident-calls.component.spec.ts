import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentCallsComponent } from './incident-calls.component';

describe('IncidentCallsComponent', () => {
  let component: IncidentCallsComponent;
  let fixture: ComponentFixture<IncidentCallsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncidentCallsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncidentCallsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
