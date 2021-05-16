import { TestBed } from '@angular/core/testing';

import { ConsignmentService } from './consignment.service';

xdescribe('ConsignmentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  xit('should be created', () => {
    const service: ConsignmentService = TestBed.get(ConsignmentService);
    expect(service).toBeTruthy();
  });
});
