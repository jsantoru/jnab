import {Component, Input, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {InputEntity} from "../input/input.component";

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  _inputEntity: InputEntity;

  constructor() { }

  ngOnInit() {
  }

  @Input() set inputEntity(inputEntity: InputEntity) {
    this._inputEntity = inputEntity;
  }

  get inputEntity(): InputEntity {
    return this._inputEntity;
  }
}

