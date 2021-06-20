import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportOutageDialogComponent } from './report-outage-dialog.component';

describe('ReportOutageDialogComponent', () => {
  let component: ReportOutageDialogComponent;
  let fixture: ComponentFixture<ReportOutageDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportOutageDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportOutageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
