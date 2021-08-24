import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LoanCardResponseComponent } from './loan-card-response.component';

describe('LoanCardResponseComponent', () => {
  let component: LoanCardResponseComponent;
  let fixture: ComponentFixture<LoanCardResponseComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LoanCardResponseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanCardResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
