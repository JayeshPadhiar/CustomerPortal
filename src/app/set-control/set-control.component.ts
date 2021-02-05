import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Reason, ExcludeCondition } from './set-control.model';

@Component({
  selector: 'app-set-control',
  templateUrl: './set-control.component.html',
  styleUrls: ['./set-control.component.css', '../app.component.css'],
})
export class SetControlComponent implements OnInit {
  constructor(public fb: FormBuilder) {}

  creasons: Array<Reason> = [
    { reason: 'Delivery is delayed' },
    { reason: 'Order placed by mistake' },
    { reason: 'Expected delivery time is too long' },
    { reason: 'Item Price/Shippingcost is too high' },
    { reason: 'Bought it from somewhere else' },
  ];
  rreasons: Array<Reason> = [
    { reason: 'Item no longer wanted' },
    { reason: 'Quality issue' },
    { reason: 'Size fit issue' },
    { reason: 'Received a different item' },
    { reason: 'Item damaged on arrival' },
    { reason: 'Item missing' },
  ];
  exconditions: Array<ExcludeCondition> = [];

  reason: any = {};
  excon: any = {};

  expansions = {
    cancelPolicy: false,
    returnPolicy: false,
  };

  cancellationPolicy: FormGroup;
  returnPolicy: FormGroup;

  ngOnInit(): void {
    this.reason = { reason: '' };
    this.excon = { option: '', condition: '', value: 0 };
    this.creasons.push(this.reason);
    this.rreasons.push(this.reason);

    this.createFormGroup();
  }

  newReason(reason): FormControl {
    return new FormControl(reason);
  }

  createFormGroup() {
    this.cancellationPolicy = this.fb.group({
      cancellationReasons: this.fb.array([]),
      cancellationRefundPolicy: this.fb.group({
        bank: this.fb.control(''),
        originalPaymentMode: this.fb.control(''),
        storeCredit: this.fb.control(''),
      }),
    });

    this.returnPolicy = this.fb.group({
      allowReturns: this.fb.control(false),
      /*returnWindowDays: this.fb.control(0),

      returnReasons: this.fb.array([]),

      returnResolutionPolicy: this.fb.group({
        refund: this.fb.control(''),
        exchange: this.fb.control(''),
        storeCredit: this.fb.control(''),
      }),

      returnRefundPolicy: this.fb.group({
        originalPaymentMode: this.fb.control(''),
        bank: this.fb.control(''),
      }),

      returnAllowRefundOptions: this.fb.group({
        cod: this.fb.control(''),
        prepaid: this.fb.control(''),
      }),*/
    });
  }

  get getReasons(): FormArray {
    return this.cancellationPolicy.get('cancellationReasons') as FormArray;
  }

  addReason() {
    this.getReasons.push(this.newReason('Hello'));
  }

  deleteReason(index) {
    this.getReasons.removeAt(index);
  }

  submit() {}

  addCondition() {
    this.excon = { option: '', condition: '', value: 0 };
    this.exconditions.push(this.excon);
    console.log(this.exconditions);
    return true;
  }
}
