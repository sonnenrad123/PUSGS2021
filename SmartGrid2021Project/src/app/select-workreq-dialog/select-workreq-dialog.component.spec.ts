import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectWorkreqDialogComponent } from './select-workreq-dialog.component';

describe('SelectWorkreqDialogComponent', () => {
  let component: SelectWorkreqDialogComponent;
  let fixture: ComponentFixture<SelectWorkreqDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectWorkreqDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectWorkreqDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
