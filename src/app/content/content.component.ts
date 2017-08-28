import {Component, Input, OnInit} from '@angular/core';
import {InputEntity} from "../input/input.component";

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  @Input() inputEntity: InputEntity;

  constructor() { }

  ngOnInit() {
  }


}
