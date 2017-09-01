import { Injectable } from '@angular/core';
import {InputEntity} from "./input/input.component";

@Injectable()
export class DerivedValueService {

  constructor() { }

  calculateDerivedValues(inputEntity: InputEntity) : DerivedValues {
    let derivedValues : DerivedValues = new DerivedValues();

    // amount to contribute = salary * contrPercent / (12 / holding period)
    derivedValues.amountToContribute = this.calculateAmountToContribute(inputEntity, derivedValues);
    derivedValues.discountSharePrice = this.calculateDiscountSharePrice(inputEntity, derivedValues);

    derivedValues.numShares = this.calculateNumShares(inputEntity, derivedValues);
    derivedValues.regularPurchase = this.calculateRegularPurchase(inputEntity, derivedValues);
    derivedValues.discountPurchase = this.calculateDiscountPurchase(inputEntity, derivedValues);

    derivedValues.discount = this.calculateDiscount(inputEntity, derivedValues);
    derivedValues.taxesOnDiscount = this.calculateTaxesOnDiscount(inputEntity, derivedValues);

    derivedValues.sharePriceAtSell = this.calculateSharePriceAtSell(inputEntity, derivedValues);
    derivedValues.sellAmount = this.calculateSellAmount(inputEntity, derivedValues);
    derivedValues.earningsOverRegularPurchase = this.calculateEarningsOverRegularPurchase(inputEntity, derivedValues);
    derivedValues.taxOnEarnings = this.calculateTaxOnEarnings(inputEntity, derivedValues);

    derivedValues.dividendAmount = this.calculateDividendAmount(inputEntity, derivedValues);
    derivedValues.taxOnDividend = this.calculateTaxOnDividend(inputEntity, derivedValues);

    this.logDerivedValues(derivedValues);

    return derivedValues;
  }

  logDerivedValues(derivedValues : DerivedValues) {
    console.log(derivedValues.amountToContribute);
    console.log(derivedValues.discountSharePrice);
  }

  calculateAmountToContribute(inputEntity: InputEntity, derivedValues: DerivedValues) : number {
    return inputEntity.personalInputEntity.salary * inputEntity.personalInputEntity.contributionPercent/100 /
      (12 / inputEntity.esppInputEntity.holdingPeriodMonths);
  }

  calculateDiscountSharePrice(inputEntity: InputEntity, derivedValues: DerivedValues) : number {
    return inputEntity.companyInputEntity.value - (inputEntity.companyInputEntity.value * inputEntity.esppInputEntity.discount/100);
  }

  calculateNumShares(inputEntity: InputEntity, derivedValues: DerivedValues) : number {
    return derivedValues.amountToContribute / derivedValues.discountSharePrice;
  }

  calculateRegularPurchase(inputEntity: InputEntity, derivedValues: DerivedValues) : number {
    return derivedValues.numShares * inputEntity.companyInputEntity.value;
  }

  calculateDiscountPurchase(inputEntity: InputEntity, derivedValues: DerivedValues) : number {
    return derivedValues.numShares * derivedValues.discountSharePrice;
  }

  calculateDiscount(inputEntity: InputEntity, derivedValues: DerivedValues) : number {
    return 0;
  }

  calculateTaxesOnDiscount(inputEntity: InputEntity, derivedValues: DerivedValues) : number {
    return 0;
  }

  calculateSharePriceAtSell(inputEntity: InputEntity, derivedValues: DerivedValues) : number {
    return 0;
  }

  calculateSellAmount(inputEntity: InputEntity, derivedValues: DerivedValues) : number {
    return 0;
  }

  calculateEarningsOverRegularPurchase(inputEntity: InputEntity, derivedValues: DerivedValues) : number {
    return 0;
  }

  calculateTaxOnEarnings(inputEntity: InputEntity, derivedValues: DerivedValues) : number {
    return 0;
  }

  calculateDividendAmount(inputEntity: InputEntity, derivedValues: DerivedValues) : number {
    return 0;
  }

  calculateTaxOnDividend(inputEntity: InputEntity, derivedValues: DerivedValues) : number {
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
