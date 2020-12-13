import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError, interval } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { BinanceLatestPrice } from '../Interfaces/BinanceLatestPrice'
import { BTCLatestPrice } from '../Interfaces/BTCLatestPrice';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompareService {


  constructor(private http: HttpClient) {
  }

  getBinanceLatestPrice(symbol: string): Observable<BinanceLatestPrice> {
    const params = new HttpParams().set('symbol', symbol);
    const url = "https://api.binance.com/api/v3/ticker/24hr"
    const $response = this.http
      .get<BinanceLatestPrice>(url, { params })
      .pipe(catchError(error => {
        console.error("Error: ", error);
        return throwError(error)
      }))

    return $response;
  }

  getBTCLatestPrice(symbol: string): Observable<BTCLatestPrice> {

    if (symbol.length != 6) return null

    const marketId = symbol.substring(0, 3) + '-' + symbol.substring(3)
    const url = `https://api.btcmarkets.net/v3/markets/${marketId}/ticker`
    const $response = this.http.get<BTCLatestPrice>(url)
      .pipe(catchError(error => {
        console.error("Error: ", error);
        return throwError(error)
      }))
    return $response;
  }
}
