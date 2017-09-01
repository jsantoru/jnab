import { Injectable } from '@angular/core';
import {InputEntity} from "./input/input.component";

@Injectable()
export class DerivedValueService {

  constructor() { }

  calculateAmountToContribute(inputEntity: InputEntity) : number {
    return inputEntity.personalInputEntity.salary * inputEntity.personalInputEntity.contributionPercent/100 /
      (12 / inputEntity.esppInputEntity.holdingPeriodMonths);
  }

  calculateDiscountSharePrice(inputEntity: InputEntity) : number {
    return inputEntity.companyInputEntity.value - (inputEntity.companyInputEntity.value * inputEntity.esppInputEntity.discount/100);
  }
}
