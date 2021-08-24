import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GoalsListingComponent } from './goals-listing.component';

describe('GoalsListingComponent', () => {
  let component: GoalsListingComponent;
  let fixture: ComponentFixture<GoalsListingComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GoalsListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoalsListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
