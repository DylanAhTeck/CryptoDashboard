import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router'
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { Observable, of, throwError, Observer } from 'rxjs';
import { concat, map, retryWhen, switchMap, take, tap, delay } from 'rxjs/operators';
import { DetailsComponent } from './details.component';
import 'zone.js/dist/zone-patch-rxjs-fake-async'



import { CryptodetailsService } from './cryptodetails.service'
import { BinanceLatestPrice } from '../Interfaces/BinanceLatestPrice';


describe('DetailsComponent', () => {
  let component: DetailsComponent;
  let fixture: ComponentFixture<DetailsComponent>;
  let symbol: HTMLElement;
  let DetailsSpy: jasmine.Spy;
  let testBinanceData: BinanceLatestPrice;
  let getCryptoDetailsSpy: jasmine.Spy;
  let getKlineDataSpy: jasmine.Spy;
  let testKlineData;
  beforeEach(() => {

    testBinanceData = {
      symbol: 'BTCAUD',
      priceChange: '2',
      priceChangePercent: '2',
      lastPrice: '100',
      bidPrice: '98',
      openPrice: '100',
      highPrice: '101',
      lowPrice: '99',
      volume: '100'
    }
    testKlineData =
      [
        [5, 1, 4.2, 3, 4.2],
        [5, 1, 4.2, 3, 4.2],
        [5, 1, 4.2, 3, 4.2],
        [5, 1, 4.2, 3, 4.2]
      ]

    const detailsService = jasmine.createSpyObj('CryptodetailsService', ['getLatestPrice', 'getKlineData']);

    getCryptoDetailsSpy = detailsService.getLatestPrice.and.returnValue(of(testBinanceData));
    getKlineDataSpy = detailsService.getKlineData.and.returnValue(of(testKlineData));

    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [DetailsComponent],
      providers: [{ provide: CryptodetailsService, useValue: detailsService }]
    })
    fixture = TestBed.createComponent(DetailsComponent);
    component = fixture.componentInstance;
    component.symbol = "BTCAUD"
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call cryptodetails service after component initialized', () => {
    fixture.detectChanges();  // onInit()
    expect(getCryptoDetailsSpy.calls.any()).toBe(true, 'data fetched on init');
  });

  it('should call service data after component initialized and set latestPrice', () => {
    fixture.detectChanges();  // onInit()
    expect(component.latestPrice).toEqual(testBinanceData)
  });
});
