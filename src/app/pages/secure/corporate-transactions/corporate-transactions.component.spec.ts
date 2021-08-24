import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateTransactionsComponent } from './corporate-transactions.component';

describe('CorporateTransactionsComponent', () => {
  let component: CorporateTransactionsComponent;
  let fixture: ComponentFixture<CorporateTransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CorporateTransactionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
