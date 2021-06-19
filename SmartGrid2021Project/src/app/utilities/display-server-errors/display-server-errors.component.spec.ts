import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayServerErrorsComponent } from './display-server-errors.component';

describe('DisplayServerErrorsComponent', () => {
  let component: DisplayServerErrorsComponent;
  let fixture: ComponentFixture<DisplayServerErrorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayServerErrorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayServerErrorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
