import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CompareService } from './compare.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BTCLatestPrice } from '../Interfaces/BTCLatestPrice';
import { BinanceLatestPrice } from '../Interfaces/BinanceLatestPrice';

describe('CompareService', () => {
  let service: CompareService;
  let symbols: string[] = ["BTCAUD", "LTCAUD", "XRPAUD", "GNTAUD", "ETHAUD", "ENJAUD"]
  let symbol: string;

  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CompareService]
    });
    service = TestBed.inject(CompareService);
    symbol = symbols[Math.floor(Math.random() * symbols.length)]
    // Inject the http service and test controller for each test
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  it('should use CompareService', () => {
    service = TestBed.inject(CompareService);
    expect(service.getBTCLatestPrice(symbol)).toBeDefined
  });

  it('Compare service is Running Fine', inject([CompareService], (service: CompareService) => {
    expect(service).toBeTruthy();
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('can test HttpClient.get BTCLatestPrice', () => {
    const testData: BTCLatestPrice = {
      marketId: 'BTCAUD',
      bestBid: '100',
      bestAsk: '1200',
      lastPrice: '20',
      volume24h: '10000.42',
      price24h: '240'
    };
    const testUrl = '/test'
    // Make an HTTP GET request
    httpClient.get<BTCLatestPrice>(testUrl)
      .subscribe(data =>
        // When observable resolves, result should match test data
        expect(data).toEqual(testData)
      );

    // The following `expectOne()` will match the request's URL.
    // If no requests or multiple requests matched that URL
    // `expectOne()` would throw.
    const req = httpTestingController.expectOne('/test');

    // Assert that the request is a GET.
    expect(req.request.method).toEqual('GET');

    // Respond with mock data, causing Observable to resolve.
    // Subscribe callback asserts that correct data was returned.
    req.flush(testData);
  });

  it('can test HttpClient.get BinanceLatestPrice', () => {
    const testData: BinanceLatestPrice = {
      symbol: 'ETCAUD',
      priceChange: '123',
      priceChangePercent: '14',
      lastPrice: '20',
      bidPrice: '21',
      openPrice: '24',
      highPrice: '29',
      lowPrice: '15',
      volume: '1500'
    };
    const testUrl = '/test'
    // Make an HTTP GET request
    httpClient.get<BinanceLatestPrice>(testUrl)
      .subscribe(data =>
        // When observable resolves, result should match test data
        expect(data).toEqual(testData)
      );

    // The following `expectOne()` will match the request's URL.
    // If no requests or multiple requests matched that URL
    // `expectOne()` would throw.
    const req = httpTestingController.expectOne('/test');

    // Assert that the request is a GET.
    expect(req.request.method).toEqual('GET');

    // Respond with mock data, causing Observable to resolve.
    // Subscribe callback asserts that correct data was returned.
    req.flush(testData);
  });


  it('can test for 404 error', () => {
    const emsg = 'deliberate 404 error';
    const testUrl = 'api/test/'
    httpClient.get<BTCLatestPrice>(testUrl).subscribe(
      data => fail('should have failed with the 404 error'),
      (error: HttpErrorResponse) => {
        expect(error.status).toEqual(404, 'status');
        expect(error.error).toEqual(emsg, 'message');
      }
    );

    const req = httpTestingController.expectOne(testUrl);

    // Respond with mock error
    req.flush(emsg, { status: 404, statusText: 'Not Found' });
  });
});
