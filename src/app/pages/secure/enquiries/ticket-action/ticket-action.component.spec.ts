import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketActionComponent } from './ticket-action.component';

describe('TicketActionComponent', () => {
  let component: TicketActionComponent;
  let fixture: ComponentFixture<TicketActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketActionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
