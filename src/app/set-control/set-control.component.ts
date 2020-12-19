import { Component, Input, OnInit } from '@angular/core';
import {Reason, ExcludeCondition} from './set-control.model'

@Component({
  selector: 'app-set-control',
  templateUrl: './set-control.component.html',
  styleUrls: ['./set-control.component.css', '../app.component.css']
})
export class SetControlComponent implements OnInit {

  constructor() { }

  creasons: Array<Reason> = [];
  rreasons: Array<Reason> = [];
  exconditions: Array<ExcludeCondition> = [];

  reason: any = {};
  excon: any = {};

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
