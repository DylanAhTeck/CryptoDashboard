import { Component, OnInit } from '@angular/core';
import { CryptodetailsService } from '../details/crytodetails.service'
import { PriceBySource } from '../Interfaces/PriceBySource'
@Component({
  selector: 'app-comparison-table',
  templateUrl: './comparison-table.component.html',
  styleUrls: ['./comparison-table.component.css']
})
export class ComparisonTableComponent implements OnInit {

  constructor(private cryptodetailsService: CryptodetailsService) { }
  tableData: [PriceBySource]
  ngOnInit(): void {
  }

}
