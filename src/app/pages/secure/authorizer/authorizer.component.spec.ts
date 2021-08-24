import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorizerComponent } from './authorizer.component';

describe('AuthorizerComponent', () => {
  let component: AuthorizerComponent;
  let fixture: ComponentFixture<AuthorizerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthorizerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
