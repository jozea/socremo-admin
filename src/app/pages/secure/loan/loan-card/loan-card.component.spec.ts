import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LoanCardComponent } from './loan-card.component';

describe('LoanCardComponent', () => {
  let component: LoanCardComponent;
  let fixture: ComponentFixture<LoanCardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LoanCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
