import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNetworkElementComponent } from './add-network-element.component';

describe('AddNetworkElementComponent', () => {
  let component: AddNetworkElementComponent;
  let fixture: ComponentFixture<AddNetworkElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNetworkElementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNetworkElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
