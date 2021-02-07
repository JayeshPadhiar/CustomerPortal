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
import { CustomerPortalBackendService } from '../customer-portal-backend.service';
import { AppStyle } from '../c-portal/cportal.model';
//import { settings } from 'cluster';

@Component({
  selector: 'app-orch-mess',
  templateUrl: './orch-mess.component.html',
  styleUrls: ['./orch-mess.component.css', '../app.component.css'],
})
export class OrchMessComponent implements OnInit {

  poeFetched: boolean = false;
  poeSettings: object;

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
  
  
  appStyle: AppStyle;

  expansions = {
    defineChannel: false,
    custNotifs: false,
  }

  channelFormGroup: FormGroup;
  senderName: FormControl;
  senderEmail: FormControl;
  smsSenderName: string;

  ngOnInit(): void {

    this.initialize();

    this.backendService.poeFetched.subscribe((fetched) => {
      this.poeFetched = fetched;
    });

    if (this.backendService.poeFetched.getValue()) {
      this.initialize();
    } else {
      this.backendService.getPoeSettings().subscribe({
        next: (data) => {
          if (data['channelId'] === '0') {
            console.log('channelID not available. Workspace Settings');
          } else {
            console.log('channelId available. Default Channel Settings');
          }
          this.backendService.initPoe(data);

          this.initialize();
        },
        error: (error) => {
          console.error('There was an error!\n', error);
        },
      });
    }
  }


  initialize() {

    this.backendService.getAppStyle().subscribe(style => this.appStyle = style)
    this.backendService.poeSettings.asObservable().subscribe(settings => this.poeSettings = settings)

    this.createFormControls();
    this.createFormGroups();
  }

  createFormControls = () => {
    this.senderName = new FormControl(this.poeSettings['senderName']);
    this.senderEmail = new FormControl(this.poeSettings['senderEmail']);


    this.smsSenderName = this.poeSettings['smsSenderName'];
  }

  createFormGroups = () => {
    this.channelFormGroup = new FormGroup({
      senderName: this.senderName,
      senderEmail: this.senderEmail
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

  isChanged(form: FormGroup) {
    return this.backendService.formChanged(form)
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
    form.reset({
      senderEmail: this.poeSettings['senderEmail'],
      senderName: this.poeSettings['senderName']
    });
  }

  constructor(private dialog: MatDialog, private backendService: CustomerPortalBackendService) {}

  showDialog() {
    this.dialog.open(NotifModalComponent, {
      panelClass: 'notif-modal',
      data: { logosrc: this.appStyle['brandLogoUrl'] },
    });
  }
}
