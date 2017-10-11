import {Component, EventEmitter, Input, OnInit, Output, ChangeDetectionStrategy} from '@angular/core';
import {EsppInputEntity} from "../espp/espp.component";
import {PersonalInputEntity} from "../personal/personal.component";
import {CompanyInputEntity} from "../ticker/ticker.component";

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputComponent implements OnInit {

  @Output() calculateEvent = new EventEmitter<InputEntity>();

  _selectedTicker : string;

  @Input()
  set selectedTicker(ticker: string) {
    console.log("InputComponent:", ticker);
    this._selectedTicker = ticker;
  }

  get selectedTicker() {
    return this._selectedTicker;
  }

  inputEntity: InputEntity = new InputEntity();

  constructor() { }

  ngOnInit() {
  }

  onLookupStockPriceEvent(stockPrice) {
    console.log("STOCK PRICE:", stockPrice);
    this.inputEntity.companyInputEntity.value = stockPrice;

    this.onClickCalculate();
  }

  onLookupDividendEvent(dividend) {
    console.log("DIVIDEND:", dividend);
    this.inputEntity.companyInputEntity.dividend = dividend;

    this.onClickCalculate();
  }

  onClickCalculate() {
    console.log("on click calculate");
    this.calculateEvent.emit(this.inputEntity);
  }

  onEsppInputEvent(esppInputEntity) {
    this.inputEntity.esppInputEntity = esppInputEntity;
    console.log("On espp input event", esppInputEntity);

    this.onClickCalculate();
  }

  onPersonalInputEvent(personalInputEntity) {
    this.inputEntity.personalInputEntity = personalInputEntity;
    console.log("on personal input event", personalInputEntity);

    this.onClickCalculate();
  }
}

export class InputEntity {
  companyInputEntity: CompanyInputEntity = new CompanyInputEntity();
  esppInputEntity: EsppInputEntity = new EsppInputEntity();
  personalInputEntity: PersonalInputEntity = new PersonalInputEntity();
}
