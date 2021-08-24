import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentSettingComponent } from './investment-setting.component';

describe('InvestmentSettingComponent', () => {
  let component: InvestmentSettingComponent;
  let fixture: ComponentFixture<InvestmentSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvestmentSettingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestmentSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
