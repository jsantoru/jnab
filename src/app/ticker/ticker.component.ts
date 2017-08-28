import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-ticker',
  templateUrl: './ticker.component.html',
  styleUrls: ['./ticker.component.css']
})
export class TickerComponent implements OnInit {

  ticker: string;
  value: string;
  dividend: string;

  @Output() lookupPriceEvent = new EventEmitter<string>();

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
  }

  lookupCompanyInfo() {
    this.lookupPrice();
    this.lookupDividend();
  }

  lookupPrice() {
    console.log("looking up ticker:", this.ticker);

    var url: string = 'http://localhost:8080/stock/price?ticker=' + this.ticker + "&apikey=demo";

    // get the current value of the ticker
    this.httpClient.get(url).subscribe(
      // currently the response data is JUST the value
      (data) => {
        console.log("RESPONSE:", data);

        this.value = data['price'];

        // fire the event now that we have a new value
        this.lookupPriceEvent.emit(this.value);

      },

      (err) => {
        console.log("ERROR:", err);
      }
    );

  }

  lookupDividend() {
    console.log("looking up dividend:", this.ticker);

    var url: string = 'http://localhost:8080/stock/dividend?ticker=' + this.ticker + "&apikey=demo";

    // get the current value of the ticker
    this.httpClient.get(url).subscribe(
      // currently the response data is JUST the value
      (data) => {
        console.log("RESPONSE:", data);

        this.dividend = data['dividendPercent']},
      (err) => {
        console.log("ERROR:", err);
      }
    );

  }
}
