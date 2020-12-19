import { Component, OnInit } from '@angular/core';
import { MobileDialogComponent } from '../mobile-dialog/mobile-dialog.component';
import {NotifModalComponent} from './../notif-modal/notif-modal.component'


import {
  MatDialogRef,
  MatDialog,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

import { AppStyle, Link } from './cportal.model';

@Component({
  selector: 'app-c-portal',
  templateUrl: './c-portal.component.html',
  styleUrls: ['./c-portal.component.css', '../app.component.css'],
})
export class CPortalComponent implements OnInit {
  panelOpenState = false;

  constructor(private dialog: MatDialog) {}

  appStyle: AppStyle = {
    background_color: '#e7e7e7',
    action_color: '#2DDBD1',
    notif_color: '#14B6AC',
    test: 'test',
    logosrc: '../../assets/img/acme.png',
    faviconsrc: '',
  };

  footerLinks: Array<Link> = [];

  openDialog() {
    //this.dialog.open(MobileDialogComponent, { panelClass: 'mobile-dialog' });
    this.dialog.open(NotifModalComponent, {
      panelClass: 'notif-modal',
      data: { logosrc: this.appStyle.logosrc},
    });
  }

  ngOnInit(): void {}
}