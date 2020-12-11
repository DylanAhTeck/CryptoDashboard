import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { CryptodetailsService } from './crytodetails.service'
import { LatestPrice } from '../Interfaces/LatestPrice'
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {


  isLoading: boolean = true;
  isInvalid: boolean = false;
  symbol: string
  latestPrice: LatestPrice
  constructor(private activatedRoute: ActivatedRoute,
    private cryptodetailsService: CryptodetailsService) {

    this.symbol = this.activatedRoute.snapshot.paramMap.get('symbol');
  }


  ngOnInit(): void {
    this.getCrytoDetails(this.symbol)
  }

  getCrytoDetails(symbol: string) {
    this.cryptodetailsService.getLatestPrice(symbol).subscribe((data) => {
      this.latestPrice = data
      console.log(data)
      this.isLoading = false
    }
    )
  }

  trimNumber(number: string): string {
    return parseFloat(number).toFixed(2)

  }

  isPositive(): boolean {
    return parseFloat(this.latestPrice.priceChange) > 0
  }
}
