import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectIncidentDialogComponent } from './select-incident-dialog.component';

describe('SelectIncidentDialogComponent', () => {
  let component: SelectIncidentDialogComponent;
  let fixture: ComponentFixture<SelectIncidentDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectIncidentDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectIncidentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
