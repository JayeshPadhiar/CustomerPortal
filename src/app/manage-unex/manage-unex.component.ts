import { Component, Input, OnInit } from '@angular/core';
import { AppStyle } from '../c-portal/cportal.model';
import { CustomerPortalBackendService } from '../customer-portal-backend.service';

@Component({
  selector: 'app-manage-unex',
  templateUrl: './manage-unex.component.html',
  styleUrls: ['./manage-unex.component.css', '../app.component.css']
})
export class ManageUnexComponent implements OnInit {

  appStyle: AppStyle;

  expansions = {
    displayNotice: false,
    showMessage: false,
  }

  constructor(private backendService: CustomerPortalBackendService) { }

  ngOnInit(): void {
    this.backendService.getAppStyle().subscribe(style => this.appStyle = style)
  }

  changeNotifColor(color, prop) {
    this.appStyle[prop] = color;
    console.log(this.appStyle[prop])
    console.log(color)
  }

}