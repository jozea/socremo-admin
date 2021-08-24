import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompalaintsComponent } from './compalaints.component';

describe('CompalaintsComponent', () => {
  let component: CompalaintsComponent;
  let fixture: ComponentFixture<CompalaintsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompalaintsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompalaintsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
