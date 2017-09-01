import { Component } from '@angular/core';
import {InputEntity} from "./input/input.component";
import {DerivedValueService} from "./derived-value.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ESPP Calculator';

  inputEntity: InputEntity;

  derivedValues: DerivedValues = new DerivedValues();

  constructor(private derivedValueService : DerivedValueService) {}

  calculate(inputEntity) {
    console.log("INPUT ENTITY:", JSON.stringify(inputEntity));
    this.calculateDerivedValues(inputEntity);
  }

  calculateDerivedValues(inputEntity: InputEntity) {
    console.log("calculating derived values");
    this.inputEntity = inputEntity;

    // amount to contribute = salary * contrPercent / (12 / holding period)
    this.derivedValues.amountToContribute = this.derivedValueService.calculateAmountToContribute(inputEntity);
    this.derivedValues.discountSharePrice = this.derivedValueService.calculateDiscountSharePrice(inputEntity);

    this.derivedValues.numShares;
    this.derivedValues.regularPurchase;
    this.derivedValues.discountPurchase;

    this.derivedValues.discount;
    this.derivedValues.taxesOnDiscount;

    this.derivedValues.sharePriceAtSell;
    this.derivedValues.sellAmount;
    this.derivedValues.earningsOverRegularPurchase;
    this.derivedValues.taxOnEarnings;

    this.derivedValues.dividendAmount;
    this.derivedValues.taxOnDividend;

    console.log(this.derivedValues.amountToContribute);
    console.log(this.derivedValues.discountSharePrice);
  }

}

export class DerivedValues {
  amountToContribute: number;

  discountSharePrice: number;
  numShares: number;

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

