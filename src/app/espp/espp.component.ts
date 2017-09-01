import {Component, EventEmitter, OnInit, Output, ChangeDetectionStrategy} from '@angular/core';

@Component({
  selector: 'app-espp',
  templateUrl: './espp.component.html',
  styleUrls: ['./espp.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EsppComponent implements OnInit {

  esppInputEntity: EsppInputEntity = new EsppInputEntity();

  @Output() esppInputEvent = new EventEmitter<EsppInputEntity>();

  constructor() {
    // set defaults
    this.esppInputEntity.discount = 15;
    this.esppInputEntity.holdingPeriodMonths = 3;
    this.esppInputEntity.fees = 35;
  }

  ngOnInit() {
    // send out what the current espp values are
    this.esppInputEvent.emit(this.esppInputEntity);
  }

}

export class EsppInputEntity {
  discount: number;
  holdingPeriodMonths: number;
  fees: number;
}
