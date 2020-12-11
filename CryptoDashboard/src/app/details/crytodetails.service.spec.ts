import { TestBed } from '@angular/core/testing';

import { CrytodetailsService } from './crytodetails.service';

describe('CrytodetailsService', () => {
  let service: CrytodetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrytodetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
