import { TestBed } from '@angular/core/testing';

import { CPortalInterceptor } from './cportal.interceptor';

describe('CPortalInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      CPortalInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: CPortalInterceptor = TestBed.inject(CPortalInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
