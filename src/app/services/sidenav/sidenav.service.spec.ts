/* tslint:disable:no-unused-variable */

import { TestBed, inject, waitForAsync } from '@angular/core/testing';
import { SidenavService } from './sidenav.service';

describe('Service: Sidenav', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SidenavService]
    });
  });

  it('should ...', inject([SidenavService], (service: SidenavService) => {
    expect(service).toBeTruthy();
  }));
});
