import { Component, OnInit, Injectable, Input } from '@angular/core';
import { CompareService } from './compare.service'
import { PriceBySource } from '../Interfaces/PriceBySource'
@Component({
  selector: 'app-comparison-table',
  templateUrl: './comparison-table.component.html',
  styleUrls: ['./comparison-table.component.css']
})
export class ComparisonTableComponent implements OnInit {

  tableData: [PriceBySource]
  constructor(private compareService: CompareService) { }

  @Input() symbol: string

  ngOnInit(): void {

    this.retrieveTableData()
  }

  retrieveTableData() {

    this.addBTCData()
    this.addBinanceData()
    //For new exchanges, just add here
    //E.g addCrytoTradesData()
  }

  addBTCData() {
    this.compareService.getBTCLatestPrice(this.symbol).subscribe(
      (value) => {
        const row: PriceBySource = {
          source: 'Btcmarket',
          sourceUrl: 'https://www.btcmarkets.net/',
          price: value.lastPrice,
          link: `https://app.btcmarkets.net/buy-sell?market=${value.marketId}`
        }
        this.tableData.push(row)
      }
    )
  }

  addBinanceData() {
    this.compareService.getBinanceLatestPrice(this.symbol).subscribe(
      (value) => {
        const row: PriceBySource = {
          source: 'Binance',
          sourceUrl: 'https://www.binance.com/',
          price: value.lastPrice,
          priceChange: value.priceChange,
          pricePercentageChange: value.priceChangePercent,
          link: `https://www.binance.com/en/trade/${value.symbol}`
        }
        this.tableData.push(row)
      }
    )
  }
}
