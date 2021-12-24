import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqSettingsComponent } from './faq-settings.component';

describe('FaqSettingsComponent', () => {
  let component: FaqSettingsComponent;
  let fixture: ComponentFixture<FaqSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FaqSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FaqSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
