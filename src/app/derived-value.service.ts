import { Injectable } from '@angular/core';
import {InputEntity} from "./input/input.component";

@Injectable()
export class DerivedValueService {

  constructor() { }

  calculateDerivedValues(inputEntity: InputEntity) : DerivedValues {
    let derivedValues : DerivedValues = new DerivedValues();

    // amount to contribute = salary * contrPercent / (12 / holding period)
    derivedValues.amountToContribute = this.calculateAmountToContribute(inputEntity);
    derivedValues.discountSharePrice = this.calculateDiscountSharePrice(inputEntity);

    derivedValues.numShares;
    derivedValues.regularPurchase;
    derivedValues.discountPurchase;

    derivedValues.discount;
    derivedValues.taxesOnDiscount;

    derivedValues.sharePriceAtSell;
    derivedValues.sellAmount;
    derivedValues.earningsOverRegularPurchase;
    derivedValues.taxOnEarnings;

    derivedValues.dividendAmount;
    derivedValues.taxOnDividend;

    this.logDerivedValues(derivedValues);

    return derivedValues;
  }

  logDerivedValues(derivedValues : DerivedValues) {
    console.log(derivedValues.amountToContribute);
    console.log(derivedValues.discountSharePrice);
  }

  calculateAmountToContribute(inputEntity: InputEntity) : number {
    return inputEntity.personalInputEntity.salary * inputEntity.personalInputEntity.contributionPercent/100 /
      (12 / inputEntity.esppInputEntity.holdingPeriodMonths);
  }

  calculateDiscountSharePrice(inputEntity: InputEntity) : number {
    return inputEntity.companyInputEntity.value - (inputEntity.companyInputEntity.value * inputEntity.esppInputEntity.discount/100);
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
