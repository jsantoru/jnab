import {Component, EventEmitter, OnInit, Output, ChangeDetectionStrategy} from '@angular/core';
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

  constructor(private httpClient: HttpClient) {
  }

  ngOnInit() {
  }

  lookupCompanyInfo() {
    this.lookupPrice();
    this.lookupDividend();
  }

  lookupPrice() {
    console.log("looking up ticker:", this.companyInputEntity.ticker);


    var url: string = 'http://localhost:8080/stock/price?ticker=' + this.companyInputEntity.ticker + "&apikey=demo";

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

    var url: string = 'http://localhost:8080/stock/dividend?ticker=' + this.companyInputEntity.ticker + "&apikey=demo";

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
