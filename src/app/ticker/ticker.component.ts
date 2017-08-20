import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-ticker',
  templateUrl: './ticker.component.html',
  styleUrls: ['./ticker.component.css']
})
export class TickerComponent implements OnInit {

  ticker: string;
  value: string;
  dividend: string = "2.9";

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
  }

  lookupTicker() {
    console.log("looking up ticker:", this.ticker);

    var url: string = 'http://localhost:8080/stock/price?ticker=' + this.ticker;

    // get the current value of the ticker
    this.httpClient.get(url).subscribe(
      // currently the response data is JUST the value
      (data) => {
        console.log("RESPONSE:", data);

        this.value = data['price']},
      (err) => {
        console.log("ERROR:", err);
      }
    );

  }



}
