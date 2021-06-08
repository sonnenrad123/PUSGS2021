import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentDevicesDialogComponent } from './incident-devices-dialog.component';

describe('IncidentDevicesDialogComponent', () => {
  let component: IncidentDevicesDialogComponent;
  let fixture: ComponentFixture<IncidentDevicesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncidentDevicesDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncidentDevicesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
