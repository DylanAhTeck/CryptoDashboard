import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComparisonTableComponent } from './comparison-table.component';
import { CompareService } from './compare.service'
import { BinanceLatestPrice } from '../Interfaces/BinanceLatestPrice';
import { BTCLatestPrice } from '../Interfaces/BTCLatestPrice';

import { of, throwError } from 'rxjs';

describe('ComparisonTableComponent', () => {
  let component: ComparisonTableComponent;
  let fixture: ComponentFixture<ComparisonTableComponent>;
  let compareServiceStub: Partial<CompareService>;
  let testBinanceData: BinanceLatestPrice
  let testBTCData: BTCLatestPrice

  let getBinanceLatestPriceSpy: jasmine.Spy;
  let getBTCLatestPriceSpy: jasmine.Spy;
  let tableEl: HTMLElement;
  let tbodyEl: HTMLElement;


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
    testBTCData = {
      marketId: 'BTCAUD',
      lastPrice: '100',
      bestAsk: '100',
      bestBid: '101',
      price24h: '99',
      volume24h: '100'
    }
    const compareService = jasmine.createSpyObj('CompareService', ['getBinanceLatestPrice', 'getBTCLatestPrice']);
    getBinanceLatestPriceSpy = compareService.getBinanceLatestPrice.and.returnValue(of(testBinanceData));
    getBTCLatestPriceSpy = compareService.getBTCLatestPrice.and.returnValue(of(testBTCData));

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ComparisonTableComponent],
      providers: [{ provide: CompareService, useValue: compareService }]
    });

    fixture = TestBed.createComponent(ComparisonTableComponent);
    component = fixture.componentInstance;
    //component.symbol = "BTCAUD"
    tableEl = fixture.nativeElement.querySelector('.table');
    tbodyEl = fixture.nativeElement.querySelector('tbody');
    //fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should have these headers', () => {
    const tableHeaders = Array.from(
      tableEl.getElementsByClassName('header')
    );
    const headerClasses = [
      'Source',
      'Price',
      'Price Change',
      'Link'
    ];

    tableHeaders.forEach(header => {

      expect(
        headerClasses.some(item => header.innerHTML == item)
      ).toBeTruthy();
    });
  })

  describe('when test with synchronous observable', () => {
    it('should not show test data before oninit', () => {
      expect(getBinanceLatestPriceSpy.calls.any()).toBe(false, 'getBLP not yet called');
      expect(getBTCLatestPriceSpy.calls.any()).toBe(false, 'getBTC not yet called');
      expect(tbodyEl.textContent).toBe('', 'no rows in table body');
    })

    it('should show table data after component initialized', () => {
      fixture.detectChanges();  // onInit()

      // sync spy result shows testQuote immediately after init
      //expect(tbodyEl.getElementsByTagName).toBe(testQuote);
      expect(getBTCLatestPriceSpy.calls.any()).toBe(true, 'getBTC called');
    });

    it('should have API price data', () => {
      fixture.detectChanges();  // onInit()

      const prices = Array.from(
        tbodyEl.getElementsByClassName('price')
      );
      const validPrices = [
        testBTCData.lastPrice,
        testBinanceData.lastPrice
      ]

      expect(prices.length).toEqual(validPrices.length);

      prices.forEach(price => {
        expect(
          validPrices.some(validPrice => price.innerHTML.match(validPrice))
        ).toBeTruthy();
      });
    });

    it('should have API price change data or N/A', () => {
      fixture.detectChanges();  // onInit()

      const priceChanges = Array.from(
        tbodyEl.getElementsByClassName('priceChange')
      );

      const validPriceChanges = [
        testBinanceData.priceChange,
        "N/A"
      ]

      priceChanges.forEach(priceChange => {
        console.info(priceChange)
        expect(
          validPriceChanges.some(validPriceChange => priceChange.innerHTML.match(validPriceChange)
          )
        ).toBeTruthy();
      });
    });
  })
})