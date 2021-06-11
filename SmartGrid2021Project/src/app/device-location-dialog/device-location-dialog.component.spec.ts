import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceLocationDialogComponent } from './device-location-dialog.component';

describe('DeviceLocationDialogComponent', () => {
  let component: DeviceLocationDialogComponent;
  let fixture: ComponentFixture<DeviceLocationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeviceLocationDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceLocationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
