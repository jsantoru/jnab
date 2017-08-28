import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {

  @Output() lookupPriceEvent = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  passOnStockPrice(stockPrice) {
    console.log("STOCK PRICE:", stockPrice);

    this.lookupPriceEvent.emit(stockPrice);
  }
}
