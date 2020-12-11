import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError, interval } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { LatestPrice } from './Interfaces/LatestPrice'
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CrytodetailsService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  };
  binanceURL: string;

  constructor(private http: HttpClient) {
    this.binanceURL = environment.BINANCE_URL;
  }

  getLatestPrice(ticker: String): Observable<LatestPrice> {
    const endpoint = "/api/v3/ticker/price"
    const response = this.http.get<LatestPrice>(`${this.binanceURL}/api/v3/ticker/price`, this.httpOptions)
    return response;
  }

}
