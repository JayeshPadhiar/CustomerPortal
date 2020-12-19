import { Component, OnInit,  Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-notif-modal',
  templateUrl: './notif-modal.component.html',
  styleUrls: ['./notif-modal.component.css']
})
export class NotifModalComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<NotifModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
  }

}
