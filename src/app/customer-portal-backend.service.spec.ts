import { TestBed } from '@angular/core/testing';

import { CustomerPortalBackendService } from './customer-portal-backend.service';

describe('CustomerPortalBackendService', () => {
  let service: CustomerPortalBackendService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerPortalBackendService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
