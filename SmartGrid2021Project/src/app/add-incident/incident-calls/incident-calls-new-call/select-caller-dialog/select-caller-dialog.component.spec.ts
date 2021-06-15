import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectCallerDialogComponent } from './select-caller-dialog.component';

describe('SelectCallerDialogComponent', () => {
  let component: SelectCallerDialogComponent;
  let fixture: ComponentFixture<SelectCallerDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectCallerDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectCallerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
