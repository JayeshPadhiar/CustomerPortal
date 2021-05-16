import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppStyle, Links } from '../c-portal/cportal.model';
import { CustomerPortalBackendService } from '../../../shared/services/customer-portal-backend.service';

@Component({
  selector: 'app-mobile-dialog',
  templateUrl: './mobile-dialog.component.html',
  styleUrls: ['./mobile-dialog.component.css']
})
export class MobileDialogComponent implements OnInit {
  appStyle: AppStyle;
  links: Links;

  notif: object;

  productListView: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<MobileDialogComponent>,
    private backendService: CustomerPortalBackendService
  ) {}

  ngOnInit(): void {
    this.backendService.appStyle$.asObservable().subscribe(style => {
      this.appStyle = Object.assign({}, style);
    });

    this.backendService.links$.asObservable().subscribe(links => {
      this.links = Object.assign({}, links);
    });

    this.backendService.notif$.subscribe(result => (this.notif = result));
  }

  close(): void {
    this.dialogRef.close();
  }
}
