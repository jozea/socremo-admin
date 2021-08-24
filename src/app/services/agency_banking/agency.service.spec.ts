/* tslint:disable:no-unused-variable */

import { TestBed, inject, waitForAsync } from '@angular/core/testing';
import { AgencyService } from './agency.service';

describe('Service: Agency', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AgencyService]
    });
  });

  it('should ...', inject([AgencyService], (service: AgencyService) => {
    expect(service).toBeTruthy();
  }));
});
