import { TestBed } from '@angular/core/testing';

import { BusinessCardServiceService } from './business-card-service.service';

describe('BusinessCardServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BusinessCardServiceService = TestBed.get(BusinessCardServiceService);
    expect(service).toBeTruthy();
  });
});
