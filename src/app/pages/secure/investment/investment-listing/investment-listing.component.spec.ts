import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { InvestmentListingComponent } from './investment-listing.component';

describe('InvestmentListingComponent', () => {
  let component: InvestmentListingComponent;
  let fixture: ComponentFixture<InvestmentListingComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ InvestmentListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestmentListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
