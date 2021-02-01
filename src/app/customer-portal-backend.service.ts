import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AppStyle, Links, FooterLink } from './c-portal/cportal.model';

@Injectable({
  providedIn: 'root',
})
export class CustomerPortalBackendService {
  defaultPoeSettings: object = {
    brandLogoUrl:
      'https://storage.googleapis.com/poe-settings-default/YOUR%20BRAND.png',
    backgroundColor: '#f6f6f6',
    actionColor: '#2DDBD1',
    cancellationReasons: [
      'Delivery is delayed',
      'Order placed by mistake',
      'Expected delivery time is too long',
      'Item Price/ Shipping Cost is too high',
      'Bought it from somewhere else',
    ],
    cancellationRefundPolicy: {
      originalPaymentMode: true,
      bank: false,
      storeCredit: false,
    },
    returnReasons: [
      'Item no longer wanted',
      'Quality issue',
      'Size fit issue',
      'Received a different item',
      'Item damaged on arrival',
      'Item missing',
    ],
    allowReturns: false,
    returnWindowDays: 30,
  };

  poeSettings: BehaviorSubject<object> = new BehaviorSubject(
    this.defaultPoeSettings
  );

  appStyle$: BehaviorSubject<AppStyle> = new BehaviorSubject({
    brandLogoUrl: this.poeSettings.value['brandLogoUrl'],
    faviconUrl: '',
    backgroundColor: this.poeSettings.value['backgroundColor'],
    actionColor: this.poeSettings.value['actionColor'],
    noticeBackgroundColor: '#14b6ac',
  });

  links$: BehaviorSubject<Links> = new BehaviorSubject({
    websiteUrl: '',
    supportUrl: '',
    supportEmail: '',
    supportPhone: '',
    footers: [{ name: '', url: '' }],
  });

  notif$: BehaviorSubject<object> = new BehaviorSubject({
    message: 'Your message will be displayed here',
    show: false,
  });

  getAppStyle(): Observable<AppStyle> {
    return this.appStyle$.asObservable();
  }

  getLinks(): Observable<Links> {
    return this.links$.asObservable();
  }

  assignInterfaces = (poeData = this.poeSettings.value) => {
    this.appStyle$.next({
      backgroundColor: poeData['backgroundColor'],
      actionColor: poeData['actionColor'],
      noticeBackgroundColor: poeData['noticeBackgroundColor'],
      brandLogoUrl: poeData['brandLogoUrl'],
      faviconUrl: poeData['faviconUrl'],
    });

    this.links$.next({
      websiteUrl: poeData['websiteUrl'],
      supportUrl: poeData['supportUrl'],
      supportEmail: poeData['supportEmail'],
      supportPhone: poeData['supportPhone'],
      footers: [],
    });
  };

  getPoeSettings = () => {
    this.httpClient
      .get<any>(
        'https://montecarlo.auperator.co/customer-portal/api/v1/poe-setting'
        )
        .subscribe({
          next: (data) => {

          //console.log('Default POE\n', this.defaultPoeSettings);
          this.poeSettings.next(data);
          console.log('POE Settings\n', this.poeSettings.value);

          this.assignInterfaces(data);
        },
        error: (error) => {
          console.error('There was an error!\n', error);
        },
      });
  };

  constructor(private httpClient: HttpClient) {
    //console.log('POE Settings\n', this.poeSettings.value);
    this.getPoeSettings();
  }
}
