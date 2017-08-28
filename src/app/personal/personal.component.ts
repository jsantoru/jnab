import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})
export class PersonalComponent implements OnInit {

  personalInputEntity: PersonalInputEntity = new PersonalInputEntity();

  @Output() personalInputEvent = new EventEmitter<PersonalInputEntity>();

  constructor() {
    this.personalInputEntity.salary = "100,000";
    this.personalInputEntity.contributionPercent = "10";
    this.personalInputEntity.marginalTaxBracket = "25";
  }

  ngOnInit() {
    this.personalInputEvent.emit(this.personalInputEntity);
  }

}

export class PersonalInputEntity {
  salary: string;
  contributionPercent: string;
  marginalTaxBracket: string;
}
