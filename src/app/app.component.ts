import { Component } from '@angular/core';
import {InputEntity} from "./input/input.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ESPP Calculator';

  inputEntity: InputEntity;

  calculate(inputEntity) {
    console.log("INPUT ENTITY:", JSON.stringify(inputEntity));
    this.inputEntity = inputEntity;
  }
}
