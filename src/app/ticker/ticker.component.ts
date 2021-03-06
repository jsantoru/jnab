import {Component, EventEmitter, OnInit, Output, ChangeDetectionStrategy, Input} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-ticker',
  templateUrl: './ticker.component.html',
  styleUrls: ['./ticker.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TickerComponent implements OnInit {

  companyInputEntity: CompanyInputEntity = new CompanyInputEntity();

  @Output() lookupPriceEvent = new EventEmitter<number>();
  @Output() lookupDividendEvent = new EventEmitter<number>();

  blah1: string = "67.240";
  blah2: string = "241.124";
  blah: string = "localhost"; //this.blah1 + "." + this.blah2;

  constructor(private httpClient: HttpClient) {
  }

  ngOnInit() {
  }

  @Input()
  set companyTicker(ticker: string) {
    console.log("TickerComponent:", ticker);

    this.companyInputEntity.ticker = ticker;
    this.lookupCompanyInfo();
  }

  lookupCompanyInfo() {
    this.lookupPrice();
    this.lookupDividend();
  }

  lookupPrice() {
    console.log("looking up ticker:", this.companyInputEntity.ticker);

    let tickerUpper = (this.companyInputEntity.ticker) ? this.companyInputEntity.ticker.toUpperCase() : this.companyInputEntity.ticker;

    let url: string = '/api/espp-calc/stock/price?ticker=' + tickerUpper + "&apikey=demo";

    console.log(url);
    // get the current value of the ticker
    this.httpClient.get(url).subscribe(
      // currently the response data is JUST the value
      (data) => {
        console.log("RESPONSE:", data);

        this.companyInputEntity.value = data['price'];

        // fire the event now that we have a new value
        this.lookupPriceEvent.emit(this.companyInputEntity.value);
      },

      (err) => {
        console.log("ERROR:", err);
      }
    );

  }

  lookupDividend() {
    console.log("looking up dividend:", this.companyInputEntity.ticker);

    let tickerUpper = (this.companyInputEntity.ticker) ? this.companyInputEntity.ticker.toUpperCase() : this.companyInputEntity.ticker;

    let url: string = '/api/espp-calc/stock/dividend?ticker=' + tickerUpper + "&apikey=demo";

    // get the current value of the ticker
    this.httpClient.get(url).subscribe(
      // currently the response data is JUST the value
      (data) => {
        console.log("RESPONSE:", data);

        this.companyInputEntity.dividend = data['dividendPercent'];

        this.lookupDividendEvent.emit(this.companyInputEntity.dividend)

      },
      (err) => {
        console.log("ERROR:", err);
      }
    );

  }
}

export class CompanyInputEntity {
  ticker: string;
  value: number;
  dividend: number;
}
