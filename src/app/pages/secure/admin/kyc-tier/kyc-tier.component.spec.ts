import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { KycTierComponent } from './kyc-tier.component';

describe('KycTierComponent', () => {
  let component: KycTierComponent;
  let fixture: ComponentFixture<KycTierComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ KycTierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KycTierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
