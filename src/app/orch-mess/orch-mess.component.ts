import { Inject } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import {NotifData} from './orch-mess.model'
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import {NotifModalComponent} from './../notif-modal/notif-modal.component'

import { Notification } from './orch-mess.model';

@Component({
  selector: 'app-orch-mess',
  templateUrl: './orch-mess.component.html',
  styleUrls: ['./orch-mess.component.css', '../app.component.css'],
})
export class OrchMessComponent implements OnInit {
  @Input() appStyle;

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

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  showDialog() {
    this.dialog.open(NotifModalComponent, {
      panelClass: 'notif-modal',
      data: { logosrc: this.appStyle.logosrc},
    });
  }
}