import {Component, EventEmitter, OnInit, Output, ChangeDetectionStrategy} from '@angular/core';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonalComponent implements OnInit {

  personalInputEntity: PersonalInputEntity = new PersonalInputEntity();

  @Output() personalInputEvent = new EventEmitter<PersonalInputEntity>();

  constructor() {
    this.personalInputEntity.salary = 100000;
    this.personalInputEntity.contributionPercent = 10;
    this.personalInputEntity.marginalTaxBracket = 25;
  }

  ngOnInit() {
    this.personalInputEvent.emit(this.personalInputEntity);
  }

}

export class PersonalInputEntity {
  salary: number;
  contributionPercent: number;
  marginalTaxBracket: number;
}
