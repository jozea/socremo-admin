import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ViewusersComponent } from './viewusers.component';

describe('ViewusersComponent', () => {
  let component: ViewusersComponent;
  let fixture: ComponentFixture<ViewusersComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewusersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewusersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
