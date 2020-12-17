import { Component, OnInit } from '@angular/core';
import { MobileDialogComponent } from "../mobile-dialog/mobile-dialog.component";

import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-c-portal',
  templateUrl: './c-portal.component.html',
  styleUrls: ['./c-portal.component.css', '../app.component.css']
})
export class CPortalComponent implements OnInit {

  panelOpenState = false;

  constructor(private dialog: MatDialog,) { }

  appStyle: Object = {
    background_color: "#e7e7e7",
    action_color: "#2DDBD1",
    notif_color: "#14B6AC",
    test: "test",
    logosrc: "../../assets/img/acme.png",
    faviconsrc: ""
  }

  openDialog() {
      this.dialog.open(MobileDialogComponent, {panelClass:'mobile-dialog'});
  }

  ngOnInit(): void {
  }
}