import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentCrewComponent } from './incident-crew.component';

describe('IncidentCrewComponent', () => {
  let component: IncidentCrewComponent;
  let fixture: ComponentFixture<IncidentCrewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncidentCrewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncidentCrewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
