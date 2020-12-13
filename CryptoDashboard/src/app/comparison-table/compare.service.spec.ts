import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CompareService } from './compare.service';

describe('CompareService', () => {
  let service: CompareService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CompareService]
    });
    service = TestBed.inject(CompareService);
  });

  it('should use CompareService', () => {
    service = TestBed.inject(CompareService);
    expect(service.getBTCLatestPrice('BTCAUD')).toBeDefined
  });

  it('Compare service is Running Fine', inject([CompareService], (service: CompareService) => {
    expect(service).toBeTruthy();
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
