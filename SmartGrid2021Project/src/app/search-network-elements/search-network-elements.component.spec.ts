import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchNetworkElementsComponent } from './search-network-elements.component';

describe('SearchNetworkElementsComponent', () => {
  let component: SearchNetworkElementsComponent;
  let fixture: ComponentFixture<SearchNetworkElementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchNetworkElementsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchNetworkElementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
