import { TestBed } from '@angular/core/testing';

import { CryptodetailsService } from './crytodetails.service';

describe('CrytodetailsService', () => {
  let service: CryptodetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CryptodetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
