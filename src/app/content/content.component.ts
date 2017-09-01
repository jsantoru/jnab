import {Component, Input, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {InputEntity} from "../input/input.component";

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentComponent implements OnInit {

  _inputEntity: InputEntity;

  constructor() { }

  ngOnInit() {
  }

  @Input() set inputEntity(inputEntity: InputEntity) {
    console.log("SETTER");
    this._inputEntity = inputEntity;
  }

  get inputEntity(): InputEntity {
    return this._inputEntity;
  }

  calculateDerivedValues(inputEntity: InputEntity) {

  }

}

export class DerivedValues {
  amountToContribute: number;

  numShares: number;
  discountSharePrice: number;

  regularPurchase: number;
  discountPurchase: number;

  discount: number;
  taxesOnDiscount: number;

  sharePriceAtSell: number;
  sellAmount: number;
  earningsOverRegularPurchase: number;
  taxOnEarnings: number;

  dividendAmount: number;
  taxOnDividend: number;
}
