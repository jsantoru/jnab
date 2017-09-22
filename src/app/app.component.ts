import { Component } from '@angular/core';
import {InputEntity} from "./input/input.component";
import {DerivedValueService, DerivedValues} from "./derived-value.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ESPP Calculator';

  inputEntity: InputEntity;

  derivedValues: DerivedValues;

  tableData: TableData;

  constructor(private derivedValueService : DerivedValueService) {}

  calculate(inputEntity) {
    console.log("INPUT ENTITY:", JSON.stringify(inputEntity));
    this.inputEntity = inputEntity;

    this.calculateDerivedValues(inputEntity);
    this.calculateTableData(inputEntity, this.derivedValues);
  }

  calculateDerivedValues(inputEntity: InputEntity) {
    console.log("calculating derived values");
    this.derivedValues = this.derivedValueService.calculateDerivedValues(inputEntity);
  }

  calculateTableData(inputEntity: InputEntity, derivedValues: DerivedValues) {
    console.log("", derivedValues);

    let tableData: TableData = new TableData();
    // amounts
    tableData.purchase = derivedValues.discountPurchase;
    tableData.sell = derivedValues.sellAmount;
    tableData.dividend = derivedValues.dividendAmount;
    tableData.taxesOnEsppDiscount = derivedValues.taxesOnDiscount;
    tableData.taxesOnEarnings = derivedValues.taxOnEarnings;
    tableData.taxesOnDividend = derivedValues.taxOnDividend;
    tableData.fees = inputEntity.esppInputEntity.fees;

    // running totals
    tableData.purchaseRunningTotal = -1 * tableData.purchase;
    tableData.sellRunningTotal = tableData.sell + tableData.purchaseRunningTotal;
    tableData.dividendRunningTotal = tableData.dividend + tableData.sellRunningTotal;
    tableData.taxesOnEsppDiscountRunningTotal = -1 * tableData.taxesOnEsppDiscount + tableData.dividendRunningTotal;
    tableData.taxesOnEarningsRunningTotal = -1 * tableData.taxesOnEarnings + tableData.taxesOnEsppDiscountRunningTotal;
    tableData.taxesOnDividendRunningTotal = -1 * tableData.taxesOnDividend + tableData.taxesOnEarningsRunningTotal;
    tableData.feesRunningTotal = -1 * tableData.fees + tableData.taxesOnDividendRunningTotal;

    console.log(tableData.purchase, tableData.purchaseRunningTotal);
    console.log(tableData.sell, tableData.sellRunningTotal);
    console.log(tableData.dividend, tableData.dividendRunningTotal);
    console.log(tableData.taxesOnEsppDiscount, tableData.taxesOnEsppDiscountRunningTotal);
    console.log(tableData.taxesOnEarnings, tableData.taxesOnEarningsRunningTotal);
    console.log(tableData.taxesOnDividend, tableData.taxesOnDividendRunningTotal);
    console.log(tableData.fees, tableData.feesRunningTotal);

    this.tableData = tableData;
  }

}

export class TableData {
  purchase: number;
  sell: number;
  dividend: number;
  taxesOnEsppDiscount: number;
  taxesOnEarnings: number;
  taxesOnDividend: number;
  fees: number;

  // running totals
  purchaseRunningTotal: number;
  sellRunningTotal: number;
  dividendRunningTotal: number;
  taxesOnEsppDiscountRunningTotal: number;
  taxesOnEarningsRunningTotal: number;
  taxesOnDividendRunningTotal: number;
  feesRunningTotal: number;
}
