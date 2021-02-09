import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CustomerPortalBackendService } from '../customer-portal-backend.service';
import { Reason, ExcludeCondition } from './set-control.model';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-set-control',
  templateUrl: './set-control.component.html',
  styleUrls: ['./set-control.component.css', '../app.component.css'],
})
export class SetControlComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    public fb: FormBuilder,
    public backendService: CustomerPortalBackendService
  ) {}

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
      allowCancellation: this.fb.control(true),
      cancellationReasons: this.fb.array([]),
      cancellationRefundPolicy: this.fb.group({
        bank: this.fb.control(
          this.backendService.poeSettings.value['cancellationRefundPolicy'][
            'bank'
          ]
        ),
        originalPaymentMode: this.fb.control(
          this.backendService.poeSettings.value['cancellationRefundPolicy'][
            'originalPaymentMode'
          ]
        ),
        storeCredit: this.fb.control(
          this.backendService.poeSettings.value['cancellationRefundPolicy'][
            'storeCredit'
          ]
        ),
      }),
    });

    let creasons: Array<string> = this.backendService.poeSettings.value[
      'cancellationReasons'
    ];
    creasons.forEach((reason) => {
      this.addReason(this.cancellationPolicy, 'cancellationReasons', reason);
    });

    this.returnPolicy = this.fb.group({
      allowReturns: this.fb.control(
        this.backendService.poeSettings.value['allowReturns']
      ),
      returnReasons: this.fb.array([]),
      returnWindowDays: this.fb.control(
        this.backendService.poeSettings.value['returnWindowDays']
      ),

      returnResolutionPolicy: this.fb.group({
        refund: this.fb.control(
          this.backendService.poeSettings.value['returnResolutionPolicy'][
            'refund'
          ]
        ),
        exchange: this.fb.control(
          this.backendService.poeSettings.value['returnResolutionPolicy'][
            'exchange'
          ]
        ),
      }),

      returnRefundPolicy: this.fb.group({
        bank: this.fb.control(
          this.backendService.poeSettings.value['returnRefundPolicy']['bank']
        ),
        originalPaymentMode: this.fb.control(
          this.backendService.poeSettings.value['returnRefundPolicy'][
            'originalPaymentMode'
          ]
        ),
        storeCredit: this.fb.control(
          this.backendService.poeSettings.value['returnRefundPolicy'][
            'storeCredit'
          ]
        ),
      }),

      returnAllowRefundOptions: this.fb.group({
        cod: this.fb.control(
          this.backendService.poeSettings.value['returnAllowRefundOptions'][
            'cod'
          ]
        ),
        prepaid: this.fb.control(
          this.backendService.poeSettings.value['returnAllowRefundOptions'][
            'prepaid'
          ]
        ),
      }),
    });

    let rreasons: Array<string> = this.backendService.poeSettings.value[
      'returnReasons'
    ];
    rreasons.forEach((reason) => {
      this.addReason(this.returnPolicy, 'returnReasons', reason);
    });

    console.log(this.cancellationPolicy.value['allowCancellation']);
  }

  getReasons(form: FormGroup, reasonType): FormArray {
    return form.get(reasonType) as FormArray;
  }

  addReason(form: FormGroup, reasonType: string, reason = '') {
    this.getReasons(form, reasonType).push(this.newReason(reason));
  }

  deleteReason(form: FormGroup, reasonType: string, index) {
    this.getReasons(form, reasonType).removeAt(index);

    form.markAsDirty();
  }

  isChanged(form: FormGroup) {
    return this.backendService.formChanged(form);
  }

  submitCancelPolicy() {
    this.expansions.cancelPolicy = this.backendService.saveForm(
      this.cancellationPolicy
    );
  }

  submitReturnPolicy() {
    this.expansions.returnPolicy = this.backendService.saveForm(
      this.returnPolicy
    );
  }

  addCondition() {
    this.excon = { option: '', condition: '', value: 0 };
    this.exconditions.push(this.excon);
    console.log(this.exconditions);
    return true;
  }

  cancel(type: string) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      panelClass: 'confirm-dialog',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);

      if (result) {

        this.createFormGroup();
        this.expansions[type] = false;
      } else {
        this.expansions[type] = true;
      }
    });
  }
}
