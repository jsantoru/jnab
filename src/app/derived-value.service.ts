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

    derivedValues.numShares = this.calculateNumShares(inputEntity);
    derivedValues.regularPurchase = this.calculateRegularPurchase(inputEntity);
    derivedValues.discountPurchase = this.calculateDiscountPurchase(inputEntity);

    derivedValues.discount = this.calculateDiscount(inputEntity);
    derivedValues.taxesOnDiscount = this.calculateTaxesOnDiscount(inputEntity);

    derivedValues.sharePriceAtSell = this.calculateSharePriceAtSell(inputEntity);
    derivedValues.sellAmount = this.calculateSellAmount(inputEntity);
    derivedValues.earningsOverRegularPurchase = this.calculateEarningsOverRegularPurchase(inputEntity);
    derivedValues.taxOnEarnings = this.calculateTaxOnEarnings(inputEntity);

    derivedValues.dividendAmount = this.calculateDividendAmount(inputEntity);
    derivedValues.taxOnDividend = this.calculateTaxOnDividend(inputEntity);

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

  calculateNumShares(inputEntity: InputEntity) : number {
    return 0;
  }

  calculateRegularPurchase(inputEntity: InputEntity) : number {
    return 0;
  }

  calculateDiscountPurchase(inputEntity: InputEntity) : number {
    return 0;
  }

  calculateDiscount(inputEntity: InputEntity) : number {
    return 0;
  }

  calculateTaxesOnDiscount(inputEntity: InputEntity) : number {
    return 0;
  }

  calculateSharePriceAtSell(inputEntity: InputEntity) : number {
    return 0;
  }

  calculateSellAmount(inputEntity: InputEntity) : number {
    return 0;
  }

  calculateEarningsOverRegularPurchase(inputEntity: InputEntity) : number {
    return 0;
  }

  calculateTaxOnEarnings(inputEntity: InputEntity) : number {
    return 0;
  }

  calculateDividendAmount(inputEntity: InputEntity) : number {
    return 0;
  }

  calculateTaxOnDividend(inputEntity: InputEntity) : number {
    return 0;
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
