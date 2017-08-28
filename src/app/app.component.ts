import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ESPP Calculator';

  stockPrice: string;

  receiveStockPrice(stockPrice) {
    console.log("APP COMPONENT STOCK PRICE:", stockPrice);
    this.stockPrice = stockPrice;
  }
}
