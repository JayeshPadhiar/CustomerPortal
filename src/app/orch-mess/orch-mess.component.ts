import { Inject } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { NotifData } from './orch-mess.model';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

import {
  ReactiveFormsModule,
  FormsModule,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';


import { NotifModalComponent } from './../notif-modal/notif-modal.component';

import { Notification } from './orch-mess.model';

@Component({
  selector: 'app-orch-mess',
  templateUrl: './orch-mess.component.html',
  styleUrls: ['./orch-mess.component.css', '../app.component.css'],
})
export class OrchMessComponent implements OnInit {

  orderNotifs: Array<Notification> = [
    {
      condition: 'When customer places the order',
      sms: '',
      email: '',
      smschk: true,
      emailchk: true,
    },
    {
      condition: 'When the order is packed',
      sms: '',
      email: '',
      smschk: true,
      emailchk: true,
    },
    {
      condition: 'When the order is shipped',
      sms: '',
      email: '',
      smschk: true,
      emailchk: true,
    },
    {
      condition: 'When the courier partner is out for delivery',
      sms: '',
      email: '',
      smschk: true,
      emailchk: true,
    },
    {
      condition: 'When the order is delivered',
      sms: '',
      email: '',
      smschk: true,
      emailchk: true,
    },
    {
      condition: 'When the courier partner fails to deliver the order',
      sms: '',
      email: '',
      smschk: true,
      emailchk: true,
    },
    {
      condition: 'When the order is cancelled by the customer',
      sms: '',
      email: '',
      smschk: true,
      emailchk: true,
    },
    {
      condition:
        'When the order is cancelled due to multiple failed delivery attempts',
      sms: '',
      email: '',
      smschk: true,
      emailchk: true,
    },
    {
      condition: 'When the order is cancelled due to fulfiment issue',
      sms: '',
      email: '',
      smschk: true,
      emailchk: true,
    },
  ];
  returnNotifs: Array<Notification> = [
    {
      condition: 'When customer places a return request',
      sms: '',
      email: '',
      smschk: true,
      emailchk: true,
    },
    {
      condition: 'When the return request is approved',
      sms: '',
      email: '',
      smschk: true,
      emailchk: true,
    },
    {
      condition: 'When the courier partner is out for pickup',
      sms: '',
      email: '',
      smschk: true,
      emailchk: true,
    },
    {
      condition: 'When the return item is picked up',
      sms: '',
      email: '',
      smschk: true,
      emailchk: true,
    },
    {
      condition: 'When the courier partner fails to pickup the item',
      sms: '',
      email: '',
      smschk: true,
      emailchk: true,
    },
    {
      condition: 'When the return item has failed the quality check',
      sms: '',
      email: '',
      smschk: true,
      emailchk: true,
    },
    {
      condition: 'When the return request is cancelled by the customer',
      sms: '',
      email: '',
      smschk: true,
      emailchk: true,
    },
    {
      condition:
      'When the return is cancelled due to multiple failed pickup attempts',
      sms: '',
      email: '',
      smschk: true,
      emailchk: true,
    },
  ];
  refundNotifs: Array<Notification> = [
    {
      condition: 'When the refund is done',
      sms: '',
      email: '',
      smschk: true,
      emailchk: true,
    },
  ];
  
  
  @Input() appStyle;

  

  expansions = {
    defineChannel: false,
    custNotifs: false,
  }

  channelFormGroup: FormGroup;
  emailsender: FormControl;
  emailaddr: FormControl;

  createFormControls = () => {
    this.emailsender = new FormControl('');
    this.emailaddr = new FormControl('');
  }

  createFormGroups = () => {
    this.channelFormGroup = new FormGroup({
      emailsender: this.emailsender,
      emailaddr: this.emailaddr
    })
  }

  checkIfDirty(form: FormGroup) {
    if (form.dirty) {
      console.log('Form was changed');
      return true;
    } else {
      console.log('Form was not changed');
      return false;
    }
  }

  onSubmit(form: FormGroup) {
    if (form.valid) {
      console.log(form.value);
      console.log('Form Submitted!');
      this.resetForm(form);
    }
  }

  cancel(form: FormGroup, exp) {
    if (this.checkIfDirty(form)) {
      this.confirmDiscard(form, exp);
    } else {
      console.log("collapsing")
      this.expansions[exp] = false;
      
    }
  }
  
  confirmDiscard(form: FormGroup, exp) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      panelClass: 'confirm-dialog',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);

      if (result) {
        this.resetForm(form);
        this.expansions[exp] = false;
      } else {
        this.expansions[exp] = true;
      }
    });
  }

  resetForm(form: FormGroup) {
    form.reset();
  }


  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    this.createFormControls();
    this.createFormGroups();
  }

  showDialog() {
    this.dialog.open(NotifModalComponent, {
      panelClass: 'notif-modal',
      data: { logosrc: this.appStyle.logosrc },
    });
  }
}
