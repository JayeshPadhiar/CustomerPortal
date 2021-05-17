import { MatDialog } from '@angular/material/dialog';
//import { MatDialogModule } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { Component, OnInit } from '@angular/core';

import { MobileDialogComponent } from '../mobile-dialog/mobile-dialog.component';
import { CustomerPortalBackendService } from '../customer-portal-backend.service';

//import {temp} from '../../customer-portal.component.css'

@Component({
  selector: 'app-c-portal',
  templateUrl: './c-portal.component.html',
  styleUrls: ['./c-portal.component.css', '../app.component.css']
})
export class CPortalComponent implements OnInit {
  panelOpenState = false;

  poeFetched: boolean = true;

  mobileView: boolean = true;

  constructor(private dialog: MatDialog, private backendService: CustomerPortalBackendService) {}

  openDialog() {
    //this.dialog.open(MobileDialogComponent, { panelClass: 'mobile-dialog' });
    /*this.dialog.open(NotifModalComponent, {
      panelClass: 'notif-modal',
      data: { logosrc: this.appStyle.logosrc },
    });*/

    this.mobileView = false;
    const dialogRef = this.dialog.open(MobileDialogComponent, {
      panelClass: 'mobile-dialog'
    });

    dialogRef.afterClosed().subscribe((domain: String) => {
      this.mobileView = true;
    });
  }

  checkin() {
    var flag = 0;
    if (localStorage.getItem('fullwidth') && localStorage.getItem('fullwidth') === 'true') {
      flag = 1;
    }
    return flag === 1 ? true : false;
  }

  ngOnInit(): void {
    //this.backendService.poeFetched.asObservable().subscribe(fetched => (this.poeFetched = fetched));
  }
}
