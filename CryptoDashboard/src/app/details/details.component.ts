import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { CryptodetailsService } from './crytodetails.service'
import { BinanceLatestPrice } from '../Interfaces/BinanceLatestPrice'
import { Observable, throwError, interval } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import * as Highcharts from 'highcharts';
import HC_stock from 'highcharts/modules/stock';
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { SymbolConversions } from '../Interfaces/SymbolConversions'
HC_stock(Highcharts);

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  date: Date;
  isLoading: boolean = true;
  isInvalid: boolean = false;
  showComparison: boolean = false;

  symbol: string = ""
  latestPrice: BinanceLatestPrice

  faCaretUp = faCaretUp
  faCaretDown = faCaretDown

  Highcharts: typeof Highcharts = Highcharts; // required
  chartConstructor: string = 'stockChart'; // optional string, defaults to 'chart'
  chartOptions: Highcharts.Options = {
    series: [{
      type: 'line'
    }]
  };
  updateFlag: boolean = false;

  constructor(private activatedRoute: ActivatedRoute,
    private cryptodetailsService: CryptodetailsService) {
    this.symbol = this.activatedRoute.snapshot.paramMap.get('symbol');

    setInterval(() => {
      this.date = new Date()
    }, 1000)

  }

  getSymbolName(): string {
    const symbol = this.symbol
    if (symbol.length < 6) return ""

    const threeChar = symbol.substring(0, 3)
    if (SymbolConversions[threeChar] != null) return SymbolConversions[threeChar];

    const fourChar = symbol.substring(0, 4)
    if (SymbolConversions[fourChar] != null) return SymbolConversions[fourChar];

    return ""
  }

  getDateTime(): String {
    return new Date().toLocaleString('en-GB').replace(",", "")
  }

  ngOnInit(): void {
    this.getCrytoDetails(this.symbol)

    //TODO: add this https://stackblitz.com/edit/highcharts-angular-stock-indicators
    this.getHighchartData(this.symbol).subscribe(value => {
      const data = []
      value.forEach(dataPoint => {
        const date = parseFloat(dataPoint[0])
        const price = parseFloat(dataPoint[4])
        data.push([new Date(date).getTime(), price])
      })
      this.chartOptions = {
        subtitle: {
          text: `${this.symbol.toUpperCase()} Price`
        },
        xAxis: {
          type: "datetime",
        },
        series: [{
          name: this.symbol.toUpperCase(),
          tooltip: {
            valueDecimals: 2
          },
          data: data,
          type: 'line',
          color: 'blue'
        }],
        rangeSelector: {
          inputEnabled: false,
          buttonTheme: {
            visibility: 'hidden'
          },
          labelStyle: {
            visibility: 'hidden'
          }
        }
      }

      this.updateFlag = true;
    })
  }

  getHighchartData(symbol: string): Observable<Object[]> {
    return this.cryptodetailsService.getKlineData(symbol)
  }

  getCrytoDetails(symbol: string) {
    this.cryptodetailsService.getLatestPrice(symbol)
      .pipe(
        catchError(err => {
          this.isInvalid = true;
          this.isLoading = false;
          return throwError(err)
        })
      )
      .subscribe((data) => {
        this.latestPrice = data
        this.isLoading = false
      }
      )
  }

  //If greater than 1, trim and format
  //else return itself
  trimNumber(number: string): string {
    if (Math.abs(parseFloat(number)) < 1) return number

    const trimmed = parseFloat(number).toFixed(2)
    return parseFloat(trimmed).toLocaleString('en')
  }

  isPositive(): boolean {
    return parseFloat(this.latestPrice.priceChange) > 0
  }

  toggleShowComparison() {
    this.showComparison = !this.showComparison
  }
}
