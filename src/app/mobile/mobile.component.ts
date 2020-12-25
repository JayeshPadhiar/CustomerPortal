import {Input, Component, OnInit } from '@angular/core';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { CustomerPortalBackendService } from '../customer-portal-backend.service';
import { AppStyle } from '../c-portal/cportal.model';


@Component({
  selector: 'app-mobile',
  templateUrl: './mobile.component.html',
  styleUrls: ['./mobile.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { displayDefaultIndicatorType: false }
  }]
})
export class MobileComponent implements OnInit {

  appStyle: AppStyle;
  @Input() footerLinks;

  constructor(private backendService: CustomerPortalBackendService) { }

  ngOnInit(): void {
    this.backendService.getAppStyle().subscribe(style => this.appStyle = style)
  }

}
