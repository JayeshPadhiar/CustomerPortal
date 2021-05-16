import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AppStyle } from '../c-portal/cportal.model';
import { CustomerPortalBackendService } from '../../../shared/services/customer-portal-backend.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-manage-unex',
  templateUrl: './manage-unex.component.html',
  styleUrls: ['./manage-unex.component.css', '../../customer-portal.component.css']
})
export class ManageUnexComponent implements OnInit {
  appStyle: AppStyle;
  originalAppStyle: AppStyle;
  notif: object;
  originalnotif: object;

  expansions = {
    displayNotice: false,
    showMessage: false
  };

  poeFetched: boolean = false;
  poeSettings: object;

  notice: FormGroup;
  delay: FormGroup;

  constructor(
    private dialog: MatDialog,
    private backendService: CustomerPortalBackendService,
    public fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.backendService.getAppStyle().subscribe(style => (this.appStyle = style));
    this.backendService.notif$.subscribe(result => (this.notif = result));
    this.originalnotif = Object.assign({}, this.notif);

    this.backendService.poeFetched.subscribe(fetched => {
      this.poeFetched = fetched;
    });

    if (this.backendService.poeFetched.getValue()) {
      console.log('poeSettings already fetched');
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

    this.createFormGroup();
  }

  initialize() {
    this.backendService.poeSettings.asObservable().subscribe(poe => {
      this.poeSettings = poe;
    });

    this.backendService.appStyle$.asObservable().subscribe(style => {
      this.appStyle = Object.assign({}, style);
    });
    this.originalAppStyle = Object.assign({}, this.appStyle);

    this.createFormGroup();
  }

  changeColor(color, prop) {
    //this.backendService.changeStyle(prop, color);
    this.backendService.appStyle$.next({ ...this.appStyle, [prop]: color });
  }

  createFormGroup() {
    this.notice = this.fb.group({
      noticeMessage: this.fb.control(this.poeSettings['noticeMessage']),
      noticeBackgroundColor: this.fb.control(this.poeSettings['noticeBackgroundColor'])
    });

    this.delay = this.fb.group({
      delayedDeliveryMessage: this.fb.control(this.poeSettings['delayedDeliveryMessage']),
      delayedPickupMessage: this.fb.control(this.poeSettings['delayedPickupMessage'])
    });

    if (this.notif['message'] != '') {
      this.notif['showmessage'] = true;
    } else {
      this.notif['showmessage'] = false;
    }

    if (this.notif['delayedDeliveryMessage'] != '' || this.notif['delayedPickupMessage'] != '') {
      this.notif['showdelay'] = true;
    } else {
      this.notif['showdelay'] = false;
    }
  }

  changeNotifColor(color, prop) {
    this.notif[prop] = color;
    console.log(this.appStyle[prop]);
    console.log(color);

    this.backendService.notif$.next({ ...this.notif, [prop]: color });
  }

  isChanged(form: FormGroup) {
    return this.backendService.formChanged(form);
  }

  submit(form: FormGroup, exp: string) {
    this.expansions[exp] = this.backendService.saveForm(form);

    this.originalnotif = Object.assign({}, this.notif);
  }

  toggleNotice(checked: boolean) {
    this.notif['showmessage'] = checked;

    if (checked) {
      this.notice = this.fb.group({
        noticeMessage: this.fb.control(this.poeSettings['noticeMessage']),
        noticeBackgroundColor: this.fb.control(this.poeSettings['noticeBackgroundColor'])
      });
      this.notif['message'] = this.poeSettings['noticeMessage'];
      this.notice.markAsDirty();
    } else {
      this.notice.controls['noticeMessage'].patchValue('');
      this.notif['message'] = '';
      this.notice.markAsDirty();
    }
  }

  toggleDelay(checked: boolean) {
    this.notif['showdelay'] = checked;

    if (checked) {
      this.delay = this.fb.group({
        delayedDeliveryMessage: this.fb.control(this.poeSettings['delayedDeliveryMessage']),
        delayedPickupMessage: this.fb.control(this.poeSettings['delayedPickupMessage'])
      });
      this.notif['delayedDeliveryMessage'] = this.poeSettings['delayedDeliveryMessage'];
      this.notif['delayedPickupMessage'] = this.poeSettings['delayedPickupMessage'];
    } else {
      this.delay.controls['delayedDeliveryMessage'].patchValue('');
      this.delay.controls['delayedPickupMessage'].patchValue('');

      this.notif['delayedDeliveryMessage'] = '';
      this.notif['delayedPickupMessage'] = '';
      this.delay.markAsDirty();
    }
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
    if (this.dirty(form)) {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        panelClass: 'confirm-dialog',
        data: {}
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log(result);

        if (result) {
          this.backendService.notif$.next({ ...this.notif, ...this.originalnotif });
          //this.notif = Object.assign({}, this.originalnotif)
          this.initialize();

          this.expansions[type] = false;
        } else {
          this.expansions[type] = true;
        }
      });
    } else {
      console.log('collapsing');
      this.expansions[type] = false;
    }

    /*const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      panelClass: 'confirm-dialog',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);

      if (result) {
        this.backendService.notif$.next({ ...this.notif, ...this.originalnotif });
        //this.notif = Object.assign({}, this.originalnotif)
        this.initialize();

        this.expansions[type] = false;
      } else {
        this.expansions[type] = true;
      }
    });*/
  }
}
