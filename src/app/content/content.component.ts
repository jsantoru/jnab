import {Component, Input, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {InputEntity} from "../input/input.component";
import {DerivedValues} from "../derived-value.service";

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  @Input() inputEntity: InputEntity;
  @Input() derivedValues: DerivedValues;

  constructor() { }

  ngOnInit() {
  }
}

