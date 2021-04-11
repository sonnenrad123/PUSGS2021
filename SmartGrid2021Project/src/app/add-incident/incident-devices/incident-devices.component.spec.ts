import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentDevicesComponent } from './incident-devices.component';

describe('IncidentDevicesComponent', () => {
  let component: IncidentDevicesComponent;
  let fixture: ComponentFixture<IncidentDevicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncidentDevicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncidentDevicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
