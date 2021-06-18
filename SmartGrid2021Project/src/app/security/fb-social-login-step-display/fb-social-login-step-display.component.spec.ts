import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FbSocialLoginStepDisplayComponent } from './fb-social-login-step-display.component';

describe('FbSocialLoginStepDisplayComponent', () => {
  let component: FbSocialLoginStepDisplayComponent;
  let fixture: ComponentFixture<FbSocialLoginStepDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FbSocialLoginStepDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FbSocialLoginStepDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
