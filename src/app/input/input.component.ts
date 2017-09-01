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

  inputEntity: InputEntity = new InputEntity();

  constructor() { }

  ngOnInit() {
  }

  onLookupStockPriceEvent(stockPrice) {
    console.log("STOCK PRICE:", stockPrice);
    this.inputEntity.companyInputEntity.value = stockPrice;
  }

  onLookupDividendEvent(dividend) {
    console.log("DIVIDEND:", dividend);
    this.inputEntity.companyInputEntity.dividend = dividend;
  }

  onClickCalculate() {
    console.log("on click calculate");
    this.calculateEvent.emit(this.inputEntity);
  }

  onEsppInputEvent(esppInputEntity) {
    this.inputEntity.esppInputEntity = esppInputEntity;
    console.log("On espp input event", esppInputEntity);
  }

  onPersonalInputEvent(personalInputEntity) {
    this.inputEntity.personalInputEntity = personalInputEntity;
    console.log("on personal input event", personalInputEntity);
  }
}

export class InputEntity {
  companyInputEntity: CompanyInputEntity = new CompanyInputEntity();
  esppInputEntity: EsppInputEntity = new EsppInputEntity();
  personalInputEntity: PersonalInputEntity = new PersonalInputEntity();
}
