import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';

import { NotifModalComponent } from './../notif-modal/notif-modal.component';
import { MobileDialogComponent } from '../mobile-dialog/mobile-dialog.component';
import { AppStyle, FooterLink, Links } from './cportal.model';
import { CustomerPortalBackendService } from '../customer-portal-backend.service';


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

  openDialog() {
    //this.dialog.open(MobileDialogComponent, { panelClass: 'mobile-dialog' });
    /*this.dialog.open(NotifModalComponent, {
      panelClass: 'notif-modal',
      data: { logosrc: this.appStyle.logosrc },
    });*/
  }

  ngOnInit(): void {
    
  }
}
