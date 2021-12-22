import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuranceListingComponent } from './insurance-listing.component';

describe('InsuranceListingComponent', () => {
  let component: InsuranceListingComponent;
  let fixture: ComponentFixture<InsuranceListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsuranceListingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsuranceListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
