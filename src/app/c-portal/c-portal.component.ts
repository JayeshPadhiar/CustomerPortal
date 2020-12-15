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
    background_color: "orange",
    action_color: "blue",
    test: "test",
    logosrc: "../../assets/img/acme.png",
    faviconsrc: ""
  }

  openDialog() {
    const dialogRef = this.dialog.open(MobileDialogComponent,{
    });
  }


  ngOnInit(): void {
  }
}