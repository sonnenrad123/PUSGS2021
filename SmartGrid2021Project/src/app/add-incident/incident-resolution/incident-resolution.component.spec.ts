import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentResolutionComponent } from './incident-resolution.component';

describe('IncidentResolutionComponent', () => {
  let component: IncidentResolutionComponent;
  let fixture: ComponentFixture<IncidentResolutionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncidentResolutionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncidentResolutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
