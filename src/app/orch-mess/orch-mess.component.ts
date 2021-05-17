import { MatDialog } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { NotifData } from './orch-mess.model';

import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { NotifModalComponent } from './../notif-modal/notif-modal.component';

import { Notification } from './orch-mess.model';
import { CustomerPortalBackendService } from '../customer-portal-backend.service';

import { AppStyle } from '../c-portal/cportal.model';
import { HttpClient } from '@angular/common/http';
//import { settings } from 'cluster';

@Component({
  selector: 'app-orch-mess',
  templateUrl: './orch-mess.component.html',
  styleUrls: ['./orch-mess.component.css', '../app.component.css']
})
export class OrchMessComponent implements OnInit {
  poeFetched: boolean = false;
  poeSettings: object;

  defaultNotifications: Array<object> = [
    {
      resource: 'shipment',
      eventSubType: 'created',
      description: 'When customer places the order',
      emailTemplateId: '13769656',
      email_preview_subject: 'Your order has been placed',
      email_preview_body: '',
      sms_preview_body: '',
      isEmailEnabled: '1',
      isSmsEnabled: '1'
    },
    {
      resource: 'shipment',
      eventSubType: 'packed',
      description: 'When the order is packed',
      emailTemplateId: '13771168',
      isEmailEnabled: '1',
      isSmsEnabled: '1'
    },
    {
      resource: 'shipment',
      eventSubType: 'dispatched',
      description: 'When the order is shipped',
      emailTemplateId: '13753633',
      isEmailEnabled: '1',
      isSmsEnabled: '1'
    },
    {
      resource: 'shipment',
      eventSubType: 'out_for_delivery',
      description: 'When the courier partner is out for delivery',
      emailTemplateId: '13793417',
      isEmailEnabled: '1',
      isSmsEnabled: '1'
    },
    {
      resource: 'shipment',
      eventSubType: 'delivered',
      description: 'When the order is delivered',
      emailTemplateId: '13793893',
      isEmailEnabled: '1',
      isSmsEnabled: '1'
    },
    {
      resource: 'shipment',
      eventSubType: 'failed_delivery',
      description: 'When the courier partner fails to deliver the order',
      emailTemplateId: '13794667',
      isEmailEnabled: '1',
      isSmsEnabled: '1'
    },
    {
      resource: 'shipment',
      eventSubType: 'cancelled',
      description: 'When the order is cancelled by the customer',
      emailTemplateId: '13793730',
      isEmailEnabled: '1',
      isSmsEnabled: '1'
    },
    {
      resource: 'shipment',
      eventSubType: 'rto',
      description: 'When the order is cancelled due to multiple failed delivery attempts',
      emailTemplateId: '********',
      isEmailEnabled: '1',
      isSmsEnabled: '1'
    },
    {
      resource: 'shipment',
      eventSubType: 'rejected',
      description: 'When the order is cancelled due to fulfilment issue',
      emailTemplateId: '*********',
      isEmailEnabled: '1',
      isSmsEnabled: '1'
    },
    {
      resource: 'returnshipment',
      eventSubType: 'created',
      description: 'When customer places a return shipment',
      emailTemplateId: '13972558',
      isEmailEnabled: '1',
      isSmsEnabled: '1'
    },
    {
      resource: 'returnshipment',
      eventSubType: 'approved',
      description: 'When the return request is approved',
      emailTemplateId: '**********',
      isEmailEnabled: '1',
      isSmsEnabled: '1'
    },
    {
      resource: 'returnshipment',
      eventSubType: 'out_for_pickup',
      description: 'When the courier partner is out for pickup',
      emailTemplateId: '14033752',
      isEmailEnabled: '1',
      isSmsEnabled: '1'
    },
    {
      resource: 'returnshipment',
      eventSubType: 'picked_up',
      description: 'When the return item is picked up',
      emailTemplateId: '14033882',
      isEmailEnabled: '1',
      isSmsEnabled: '1'
    },
    {
      resource: 'returnshipment',
      eventSubType: 'failed_pickup',
      description: 'When the courier partner fails to pickup the item',
      emailTemplateId: '*********',
      isEmailEnabled: '1',
      isSmsEnabled: '1'
    },
    {
      resource: 'returnshipment',
      eventSubType: 'failed_quality_check',
      description: 'When the return item has failed the quality check',
      emailTemplateId: '**********',
      isEmailEnabled: '1',
      isSmsEnabled: '1'
    },
    {
      resource: 'returnshipment',
      eventSubType: 'pickup_cancelled',
      description: 'When the return request is cancelled by the customer',
      emailTemplateId: '14033906',
      isEmailEnabled: '1',
      isSmsEnabled: '1'
    },
    {
      resource: 'returnshipment',
      eventSubType: 'multiple_failed_pickup',
      description: 'When the return is cancelled due to multiple failed pickup attempts',
      emailTemplateId: '**********',
      isEmailEnabled: '1',
      isSmsEnabled: '1'
    },
    {
      resource: 'refund',
      eventSubType: 'approved',
      description: 'When the request for refund is approved',
      emailTemplateId: '14033825',
      isEmailEnabled: '1',
      isSmsEnabled: '1'
    },
    {
      resource: 'refund',
      eventSubType: 'initiated',
      description: 'When the refund is initiated',
      emailTemplateId: '14033828',
      isEmailEnabled: '1',
      isSmsEnabled: '1'
    },
    {
      resource: 'refund',
      eventSubType: 'rejected',
      description: 'When the request for refund is rejected',
      emailTemplateId: '20244211',
      isEmailEnabled: '1',
      isSmsEnabled: '1'
    }
  ];

  notifications = [];

  getResourceArray(type: string) {
    let resourceArray = [];

    this.notifications.forEach(notifObject => {
      if (notifObject['resource'] === type) {
        resourceArray.push(notifObject);
      }
    });

    return resourceArray;
  }

  appStyle: AppStyle;

  expansions = {
    defineChannel: false,
    custNotifs: false
  };

  channelFormGroup: FormGroup;
  senderName: FormControl;
  senderEmail: FormControl;
  smsSenderName: string;

  changes = [];

  ngOnInit(): void {
    this.initialize();

    this.backendService.poeFetched.subscribe(fetched => {
      this.poeFetched = fetched;
    });

    if (this.backendService.poeFetched.getValue()) {
      this.initialize();
    } else {
      this.backendService.getPoeSettings().subscribe({
        next: data => {
          if (data['channelId'] === '0') {
            console.log('channelID not available. Workspace Settings');
          } else {
            console.log('channelId available. Default Channel Settings');
          }
          this.backendService.initPoe(data);

          this.initialize();
        },
        error: error => {
          console.error('There was an error!\n', error);
        }
      });
    }

    this.getResourceArray('shipment');
  }

  getNotifications() {
    if (this.poeSettings['channelId'] === '0') {
      console.log('Yes');

      this.httpClient.get<object>('customer-portal/api/v1/poe-notifications').subscribe({
        next: data => {
          if (data['channelId'] === '0') {
            console.log('channelID not available. Workspace Settings');
            console.log('Latest Notifications : ', data);
            this.parseLatestNotifications(data['notificationOptions']);
          } else {
            console.log('channelId available. Default Channel Settings');
            console.log('Latest Notifications : ', data);
          }
        },
        error: error => {
          console.error('There was an error!\n', error);
        }
      });
    } else {
      console.log('No');
    }
  }

  parseLatestNotifications = (newNotifsArray: Array<object>) => {
    this.notifications = [];

    this.defaultNotifications.forEach(notif => {
      let pushed = false;

      newNotifsArray.forEach(newNotif => {
        if (notif['resource'] == newNotif['resource'] && notif['eventSubType'] == newNotif['eventSubType']) {
          console.log('got a same value');
          notif = { ...notif, ...newNotif };
          this.notifications.push(notif);
          pushed = true;
        }
      });

      if (!pushed) {
        this.notifications.push(notif);
      }
    });

    console.log('Final Notifs', this.notifications);
  };

  initialize() {
    this.backendService.getAppStyle().subscribe(style => (this.appStyle = style));
    this.backendService.poeSettings.asObservable().subscribe(settings => (this.poeSettings = settings));

    this.createFormControls();
    this.createFormGroups();

    this.getNotifications();
  }

  createFormControls = () => {
    this.senderName = new FormControl(this.poeSettings['senderName']);
    this.senderEmail = new FormControl(this.poeSettings['senderEmail']);

    this.smsSenderName = this.poeSettings['smsSenderName'];
  };

  createFormGroups = () => {
    this.channelFormGroup = new FormGroup({
      senderName: this.senderName,
      senderEmail: this.senderEmail
    });
  };

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
    return this.backendService.formChanged(form);
  }

  onSubmit(form: FormGroup) {
    if (form.valid) {
      console.log(form.value);
      console.log('Form Submitted!');
      this.resetForm(form);
    }
  }

  saveChannel = () => {
    this.expansions.defineChannel = this.backendService.saveForm(this.channelFormGroup);
  };

  dirty(form: FormGroup) {
    if (form.dirty) {
      console.log('Form was changed');
      return true;
    } else {
      console.log('Form was not changed');
      return false;
    }
  }

  cancel(form: FormGroup, exp) {
    if (this.checkIfDirty(form)) {
      this.confirmDiscard(form, exp);
    } else {
      console.log('collapsing');
      this.expansions[exp] = false;
    }
  }

  confirmDiscard(form: FormGroup, exp) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      panelClass: 'confirm-dialog',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
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

  constructor(
    private dialog: MatDialog,
    private backendService: CustomerPortalBackendService,
    private httpClient: HttpClient
  ) {}

  showDialog() {
    this.dialog.open(NotifModalComponent, {
      panelClass: 'notif-modal',
      data: { logosrc: this.appStyle['brandLogoUrl'] }
    });
  }

  recordChanges(resource, eventSubType, email, sms) {
    let changesMade = false;

    for (var i in this.changes) {
      if (this.changes[i]['resource'] == resource && this.changes[i]['eventSubType'] == eventSubType) {
        this.changes[i] = {
          ...this.changes[i],
          ...{
            resource: resource,
            eventSubType: eventSubType,
            isEmailEnabled: email ? '1' : '0',
            isSmsEnabled: sms ? '1' : '0'
          }
        };
        changesMade = true;
      }
    }

    if (!changesMade) {
      console.log('New row');
      this.changes.push({
        resource: resource,
        eventSubType: eventSubType,
        isEmailEnabled: email ? '1' : '0',
        isSmsEnabled: sms ? '1' : '0'
      });
    }
    console.log(this.changes);
  }

  saveNotifications() {
    let postData: object = {
      notificationOptions: this.changes
    };

    if (this.poeSettings['channelId'] === '0') {
      console.log('Not going to add the channelId in the POST request');
    } else {
      postData['channelId'] = this.poeSettings['channelId'];
    }

    console.log(postData);

    console.log(JSON.stringify(postData));

    this.httpClient
      .post('customer-portal/api/v1/poe-notifications', JSON.stringify(postData))
      .subscribe(newNotifdata => {
        console.log('new Notif Data = ', newNotifdata);

        this.parseLatestNotifications(newNotifdata['notificationOptions']);

        this.expansions.custNotifs = false;
      });
  }

  cancelNotifs() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      panelClass: 'confirm-dialog',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);

      if (result) {
        this.notifications = [...this.defaultNotifications];
        this.changes = [];

        this.expansions['custNotifs'] = false;
      } else {
        this.expansions['custNotifs'] = true;
      }
    });
  }
}
