import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {

  @Output() calculateEvent = new EventEmitter<InputEntity>();

  inputEntity: InputEntity = new InputEntity();

  constructor() { }

  ngOnInit() {
  }

  setStockPrice(stockPrice) {
    console.log("STOCK PRICE:", stockPrice);

    // inputEntity
    this.inputEntity.value = stockPrice;
  }

  onClickCalculate() {
    console.log("on click calculate");
    this.calculateEvent.emit(this.inputEntity);
  }
}

export class InputEntity {
  // company info
  ticker: string;
  value: string;
  dividend: string;

  // espp info
  discount: string;
  holdingPeriodMonths: string;
  fees: string;

  // personal info
  salary: string;
  contributionPercent: string;
  marginalTaxBracket: string;
}
