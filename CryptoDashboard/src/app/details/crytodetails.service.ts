import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError, interval } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { LatestPrice } from '../Interfaces/LatestPrice'
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CryptodetailsService {

  httpOptions = {
    headers: new HttpHeaders({
      // 'Content-Type': 'application/json',
      //'Access-Control-Allow-Headers': '*',
      // 'Access-Control-Allow-Origin': '*',
      // "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    }),
    params: new HttpParams()
  };

  //  headers= new HttpHeaders({
  //   // 'Content-Type': 'application/json',
  //   'Access-Control-Allow-Origin': '*'
  // })

  binanceURL: string;

  constructor(private http: HttpClient) {
    this.binanceURL = environment.BINANCE_URL;
  }

  getLatestPrice(symbol: string): Observable<LatestPrice> {
    const params = new HttpParams().set('symbol', symbol);
    // this.httpOptions.params = params
    this.httpOptions.params.set('symbol', symbol)
    const endpoint = "/api/v3/ticker/24hr"
    console.log(this.httpOptions)
    const $response = this.http
      .get<LatestPrice>(`${this.binanceURL}${endpoint}`, { params })
      .pipe(catchError(error => {
        console.error("Error: ", error);
        return throwError(error)
      }))

    return $response;
  }

  getKlineData(symbol: string): Observable<Object[]> {
    const params = new HttpParams()
      .set('symbol', symbol)
      .set('interval', '1d');

    const endpoint = "/api/v3/klines"
    console.log("HERE!")
    const $response = this.http
      .get<Object[]>(`${this.binanceURL}${endpoint}`, { params })
      .pipe(catchError(error => {
        console.error("Error: ", error);
        return throwError(error)
      }))

    return $response;
  }

}
