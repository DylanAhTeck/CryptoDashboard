import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CryptodetailsService } from './cryptodetails.service';

describe('CrytodetailsService', () => {
  let service: CryptodetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CryptodetailsService]
    });
    service = TestBed.inject(CryptodetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
