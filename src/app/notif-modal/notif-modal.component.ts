import { Component, OnInit,  Inject } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-notif-modal',
  templateUrl: './notif-modal.component.html',
  styleUrls: ['./notif-modal.component.css']
})
export class NotifModalComponent implements OnInit {

  toggle: boolean = true;

  constructor(
    public dialogRef: MatDialogRef<NotifModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
  }

  toggleView(change: MatButtonToggleChange){
    this.toggle = change.value;
  }

}
