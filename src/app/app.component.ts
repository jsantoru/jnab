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

  constructor(private derivedValueService : DerivedValueService) {}

  calculate(inputEntity) {
    console.log("INPUT ENTITY:", JSON.stringify(inputEntity));
    this.inputEntity = inputEntity;

    this.calculateDerivedValues(inputEntity);
  }

  calculateDerivedValues(inputEntity: InputEntity) {
    console.log("calculating derived values");
    this.derivedValues = this.derivedValueService.calculateDerivedValues(inputEntity);
  }

}

