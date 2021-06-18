import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialLoginStepDisplayComponent } from './social-login-step-display.component';

describe('SocialLoginStepDisplayComponent', () => {
  let component: SocialLoginStepDisplayComponent;
  let fixture: ComponentFixture<SocialLoginStepDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SocialLoginStepDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialLoginStepDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
