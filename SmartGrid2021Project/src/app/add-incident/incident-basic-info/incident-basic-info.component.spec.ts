import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentBasicInfoComponent } from './incident-basic-info.component';

describe('IncidentBasicInfoComponent', () => {
  let component: IncidentBasicInfoComponent;
  let fixture: ComponentFixture<IncidentBasicInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncidentBasicInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncidentBasicInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
