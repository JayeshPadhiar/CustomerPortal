import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';

import { AppStyle, Link } from './cportal.model';
import { MobileDialogComponent } from '../mobile-dialog/mobile-dialog.component';
import { CustomerPortalBackendService } from '../customer-portal-backend.service';
import { NotifModalComponent } from './../notif-modal/notif-modal.component';


@Component({
  selector: 'app-c-portal',
  templateUrl: './c-portal.component.html',
  styleUrls: ['./c-portal.component.css', '../app.component.css'],
})
export class CPortalComponent implements OnInit {
  panelOpenState = false;

  constructor(
    private dialog: MatDialog,
    private backendService: CustomerPortalBackendService
  ) {}

  appStyle: AppStyle;

  footerLinks: Array<Link> = [];

  openDialog() {
    //this.dialog.open(MobileDialogComponent, { panelClass: 'mobile-dialog' });
    /*this.dialog.open(NotifModalComponent, {
      panelClass: 'notif-modal',
      data: { logosrc: this.appStyle.logosrc },
    });*/
  }

  ngOnInit(): void {
    this.backendService
      .getAppStyle()
      .subscribe((appStyle) => (this.appStyle = appStyle));
  }
}
