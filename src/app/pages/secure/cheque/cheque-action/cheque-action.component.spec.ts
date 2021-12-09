import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChequeActionComponent } from './cheque-action.component';

describe('ChequeActionComponent', () => {
  let component: ChequeActionComponent;
  let fixture: ComponentFixture<ChequeActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChequeActionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChequeActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
