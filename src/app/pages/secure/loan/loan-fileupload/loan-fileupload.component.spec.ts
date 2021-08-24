import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LoanFileuploadComponent } from './loan-fileupload.component';

describe('LoanFileuploadComponent', () => {
  let component: LoanFileuploadComponent;
  let fixture: ComponentFixture<LoanFileuploadComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LoanFileuploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanFileuploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
