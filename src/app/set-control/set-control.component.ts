import { Component, Input, OnInit } from '@angular/core';
import {Reason, ExcludeCondition} from './set-control.model'

@Component({
  selector: 'app-set-control',
  templateUrl: './set-control.component.html',
  styleUrls: ['./set-control.component.css', '../app.component.css']
})
export class SetControlComponent implements OnInit {

  constructor() { }

  creasons: Array<Reason> = [{reason: 'Delivery is delayed'}, {reason: 'Order placed by mistake'}, {reason: 'Expected delivery time is too long'}, {reason: 'Item Price/Shippingcost is too high'}, {reason: 'Bought it from somewhere else'} ];
  rreasons: Array<Reason> = [{reason: 'Item no longer wanted'}, {reason: 'Quality issue'}, {reason: 'Size fit issue'}, {reason: 'Received a different item'}, {reason: 'Item damaged on arrival'}, {reason: 'Item missing'}];
  exconditions: Array<ExcludeCondition> = [];

  reason: any = {};
  excon: any = {};

  expansions = {
    cancelPolicy: false,
    returnPolicy: false,
  }

  ngOnInit(): void {
    this.reason = { reason: ''};
    this.excon = {option: '', condition: '', value: 0}
    this.creasons.push(this.reason);
    this.rreasons.push(this.reason);
  }

  addReason(reason_type: Array<Reason>) {
    this.reason = { name: ''};
    reason_type.push(this.reason);
    console.log(reason_type);
    return true;
  }

  addCondition() {
    this.excon = { option: '', condition: '', value: 0 };
    this.exconditions.push(this.excon);
    console.log(this.exconditions);
    return true;
  }

  deleteRow(reason_type, index) {
    if (reason_type.length == 1) {
      return false;
    } else {
      reason_type.splice(index, 1);
      return true;
    }
  }

}
