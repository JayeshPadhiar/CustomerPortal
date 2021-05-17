import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CustomerPortalBackendService } from '../customer-portal-backend.service';
import { Reason, ExcludeCondition } from './set-control.model';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { HttpClient } from '@angular/common/http';
import { filter } from 'rxjs/operators';
//import { AlertService } from 'src/app/shared/services';

@Component({
  selector: 'app-set-control',
  templateUrl: './set-control.component.html',
  styleUrls: ['./set-control.component.css', '../app.component.css']
})
export class SetControlComponent implements OnInit {
  constructor(
    private httpClient: HttpClient,
    private dialog: MatDialog,
    public fb: FormBuilder,
    public backendService: CustomerPortalBackendService,
    //private alertService: AlertService
  ) {}

  creasons: Array<Reason> = [
    { reason: 'Delivery is delayed' },
    { reason: 'Order placed by mistake' },
    { reason: 'Expected delivery time is too long' },
    { reason: 'Item Price/Shippingcost is too high' },
    { reason: 'Bought it from somewhere else' }
  ];
  rreasons: Array<Reason> = [
    { reason: 'Item no longer wanted' },
    { reason: 'Quality issue' },
    { reason: 'Size fit issue' },
    { reason: 'Received a different item' },
    { reason: 'Item damaged on arrival' },
    { reason: 'Item missing' }
  ];

  reason: any = {};

  defaultExcludeConditions: any = {
    filters: [{ field: '', conditions: '', value: 0 }],
    exludeCertainProducts: false,
    productFilterMatchingCriteria: 'Any'
  };

  excludeConditions: any;

  expansions = {
    cancelPolicy: false,
    returnPolicy: false
  };

  cancellationPolicy: FormGroup;
  returnPolicy: FormGroup;

  channelId: string;

  ngOnInit(): void {
    this.reason = { reason: '' };
    this.creasons.push(this.reason);
    this.rreasons.push(this.reason);

    this.channelId = this.backendService.poeSettings.value['channelId'];

    this.excludeConditions = { ...this.defaultExcludeConditions };

    if (this.channelId === '0') {
      console.log('Fetching Workspace Filters');
      this.httpClient.get<object>('customer-portal/api/v1/poe-filter').subscribe({
        next: data => {
          //let poeFilter = Object.assign({}, data);

          if (data === null) {
            console.log('No Filters Available');
          } else {
            console.log('Filters Available : ', data);

            console.log('Default ExCons : ', this.excludeConditions);

            this.defaultExcludeConditions = { ...this.defaultExcludeConditions, ...data };
            this.excludeConditions = { ...this.defaultExcludeConditions, ...data };

            console.log('New ExCons : ', this.excludeConditions);
          }
        },
        error: error => {
          console.error('There was an error!\n', error);
        }
      });
    } else {
      console.log('Fetching Channel Filters');
      this.httpClient.get<object>(`customer-portal/api/v1/poe-filter/${this.channelId}`).subscribe({
        next: data => {
          //let poeFilter = Object.assign({}, data);

          if (data === null) {
            console.log('No Filters Available');
          } else {
            console.log('Filters Available : ', data);

            console.log('Default ExCons : ', this.excludeConditions);

            this.excludeConditions = { ...this.excludeConditions, ...data };

            console.log('New ExCons : ', this.excludeConditions);
          }
        },
        error: error => {
          console.error('There was an error!\n', error);
        }
      });
    }

    this.createFormGroup();
  }

  getPoeFilter() {
    /*if (this.channelId === '0') {
      console.log('channelID not available. Workspace Settings');
      return this.httpClient.get<object>('customer-portal/api/v1/poe-filter');
    } else {
      console.log('channelId available. Default Channel Settings');
      return this.httpClient.get<object>(`customer-portal/api/v1/poe-filter/${this.channelId}`);
    }*/
  }

  newReason(reason): FormControl {
    return new FormControl(reason);
  }

  createFormGroup() {
    this.excludeConditions = { ...this.defaultExcludeConditions };

    this.cancellationPolicy = this.fb.group({
      allowCancellation: this.fb.control(true),
      cancellationReasons: this.fb.array([]),
      cancellationRefundPolicy: this.fb.group({
        bank: this.fb.control(this.backendService.poeSettings.value['cancellationRefundPolicy']['bank']),
        originalPaymentMode: this.fb.control(
          this.backendService.poeSettings.value['cancellationRefundPolicy']['originalPaymentMode']
        ),
        storeCredit: this.fb.control(this.backendService.poeSettings.value['cancellationRefundPolicy']['storeCredit'])
      })
    });

    let creasons: Array<string> = this.backendService.poeSettings.value['cancellationReasons'];
    creasons.forEach(reason => {
      this.addReason(this.cancellationPolicy, 'cancellationReasons', reason);
    });

    this.returnPolicy = this.fb.group({
      allowReturns: this.fb.control(this.backendService.poeSettings.value['allowReturns']),
      returnReasons: this.fb.array([]),
      returnWindowDays: this.fb.control(this.backendService.poeSettings.value['returnWindowDays']),

      //exludeCertainProducts: this.fb.control(filter['exludeCertainProducts']),
      //productFilterMatchingCriteria: this.fb.control(filter['productFilterMatchingCriteria']),

      returnResolutionPolicy: this.fb.group({
        refund: this.fb.control(this.backendService.poeSettings.value['returnResolutionPolicy']['refund']),
        exchange: this.fb.control(this.backendService.poeSettings.value['returnResolutionPolicy']['exchange'])
      }),

      returnRefundPolicy: this.fb.group({
        bank: this.fb.control(this.backendService.poeSettings.value['returnRefundPolicy']['bank']),
        originalPaymentMode: this.fb.control(
          this.backendService.poeSettings.value['returnRefundPolicy']['originalPaymentMode']
        ),
        storeCredit: this.fb.control(this.backendService.poeSettings.value['returnRefundPolicy']['storeCredit'])
      }),

      returnAllowRefundOptions: this.fb.group({
        cod: this.fb.control(this.backendService.poeSettings.value['returnAllowRefundOptions']['cod']),
        prepaid: this.fb.control(this.backendService.poeSettings.value['returnAllowRefundOptions']['prepaid'])
      })
    });

    let rreasons: Array<string> = this.backendService.poeSettings.value['returnReasons'];
    rreasons.forEach(reason => {
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
    this.expansions.cancelPolicy = this.backendService.saveForm(this.cancellationPolicy);
  }

  submitReturnPolicy() {
    if (this.validateFilter()) {
      if (this.channelId === '0') {
        delete this.excludeConditions['channelId'];
        console.log('Deleting the channelID');

        let data = JSON.stringify(this.excludeConditions);
        console.log('Gonna push', data);

        this.httpClient.post('customer-portal/api/v1/poe-filter', data).subscribe(filter => {
          console.log('new Filter Data = ', filter);

          //this.excludeConditions = Object.assign({}, filter);
        });
      } else {
        let data = JSON.stringify(this.excludeConditions);
        console.log('Gonna push', data);

        this.httpClient.post(`customer-portal/api/v1/poe-filter/${this.channelId}`, data).subscribe(filter => {
          console.log('new Filter Data = ', filter);
          this.excludeConditions = Object.assign({}, filter);
        });
      }

      this.expansions.returnPolicy = this.backendService.saveForm(this.returnPolicy);
    } else {
      //this.alertService.showError('The condition fields should not be empty');
    }
  }

  addCondition() {
    let condition = { field: '', conditions: '', value: '' };
    //this.exconditions.push(condition);
    this.excludeConditions['filters'].push(condition);
    console.log(this.excludeConditions['filters']);
    return true;
  }

  deleteCondition(index) {
    this.excludeConditions['filters'].splice(index, 1);
    this.returnPolicy.markAsDirty();
  }

  validateFilter(): boolean {
    let valid: boolean = true;

    this.excludeConditions['filters'].forEach(element => {
      console.log('Validating Filters');
      if (element['field'] === '' || element['conditions'] === '' || element['value'] === '') {
        //if(this.excludeConditions['exludeCertainProducts']){}
        console.log('Field Empty');
        valid = false;
      }
    });

    return valid;
  }

  dirty(form: FormGroup) {
    if (form.dirty) {
      console.log('Form was changed');
      return true;
    } else {
      console.log('Form was not changed');
      return false;
    }
  }

  cancel(type: string, form: FormGroup) {
    /*const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      panelClass: 'confirm-dialog',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);

      if (result) {
        this.createFormGroup();
        this.expansions[type] = false;
      } else {
        this.expansions[type] = true;
      }
    });*/

    if (this.dirty(form)) {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        panelClass: 'confirm-dialog',
        data: {}
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log(result);

        if (result) {
          this.createFormGroup();
          this.expansions[type] = false;
        } else {
          this.expansions[type] = true;
        }
      });
    } else {
      console.log('collapsing');
      this.expansions[type] = false;
    }
  }
}
