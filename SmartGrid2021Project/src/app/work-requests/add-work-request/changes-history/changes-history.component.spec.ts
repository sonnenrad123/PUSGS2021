import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangesHistoryComponent } from './changes-history.component';

describe('ChangesHistoryComponent', () => {
  let component: ChangesHistoryComponent;
  let fixture: ComponentFixture<ChangesHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangesHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangesHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
