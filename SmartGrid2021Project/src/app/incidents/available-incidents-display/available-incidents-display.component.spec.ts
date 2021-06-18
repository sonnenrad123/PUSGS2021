import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableIncidentsDisplayComponent } from './available-incidents-display.component';

describe('AvailableIncidentsDisplayComponent', () => {
  let component: AvailableIncidentsDisplayComponent;
  let fixture: ComponentFixture<AvailableIncidentsDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvailableIncidentsDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailableIncidentsDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
