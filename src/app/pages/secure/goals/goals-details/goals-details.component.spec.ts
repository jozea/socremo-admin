import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalsDetailsComponent } from './goals-details.component';

describe('GoalsDetailsComponent', () => {
  let component: GoalsDetailsComponent;
  let fixture: ComponentFixture<GoalsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoalsDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoalsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
