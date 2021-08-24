import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateInvestmentComponent } from './corporate-investment.component';

describe('CorporateInvestmentComponent', () => {
  let component: CorporateInvestmentComponent;
  let fixture: ComponentFixture<CorporateInvestmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CorporateInvestmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateInvestmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
