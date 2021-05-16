import { Input, Component, OnInit } from '@angular/core';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { CustomerPortalBackendService } from '../../../shared/services/customer-portal-backend.service';
import { AppStyle, FooterLink, Links } from '../c-portal/cportal.model';

@Component({
  selector: 'app-mobile',
  templateUrl: './mobile.component.html',
  styleUrls: ['./mobile.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false }
    }
  ]
})
export class MobileComponent implements OnInit {
  appStyle: AppStyle;
  links: Links;

  notif: object;

  productListView: boolean = false;

  constructor(private backendService: CustomerPortalBackendService) {}

  ngOnInit(): void {
    this.backendService.getAppStyle().subscribe(style => (this.appStyle = style));
    this.backendService.getLinks().subscribe(links => (this.links = links));
    this.backendService.notif$.subscribe(result => (this.notif = result));
  }
}
