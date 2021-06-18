import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitchingPlansComponent } from './switching-plans.component';

describe('SwitchingPlansComponent', () => {
  let component: SwitchingPlansComponent;
  let fixture: ComponentFixture<SwitchingPlansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwitchingPlansComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SwitchingPlansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
