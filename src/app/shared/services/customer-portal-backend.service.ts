import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { env } from 'process';
import { BehaviorSubject, Observable } from 'rxjs';
import { AppStyle, Links, FooterLink } from '../../customer-portal/components/c-portal/cportal.model';

import { AlertService } from './alert.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerPortalBackendService {
  private ApiUrl = env.API_URL;
  private ExportApiUrl = env.PLATFORM_API_URL;
  private PaymentURL = env.PAYMENTS_API_URL;
  private AuthorizationToken: string;
  private accountslug: string;
  private headers: any;

  defaultPoeSettings: object = {
    brandLogoUrl: 'https://storage.googleapis.com/poe-settings-default/YOUR%20BRAND.png',
    backgroundColor: '#f6f6f6',
    actionColor: '#2DDBD1',
    cancellationReasons: [
      'Delivery is delayed',
      'Order placed by mistake',
      'Expected delivery time is too long',
      'Item Price/ Shipping Cost is too high',
      'Bought it from somewhere else'
    ],
    cancellationRefundPolicy: {
      originalPaymentMode: true,
      bank: false,
      storeCredit: false
    },
    returnReasons: [
      'Item no longer wanted',
      'Quality issue',
      'Size fit issue',
      'Received a different item',
      'Item damaged on arrival',
      'Item missing'
    ],
    allowReturns: false,
    returnWindowDays: 30
  };

  poeSettings: BehaviorSubject<object> = new BehaviorSubject(this.defaultPoeSettings);
  poeFetched: BehaviorSubject<boolean> = new BehaviorSubject(false);

  appStyle$: BehaviorSubject<AppStyle> = new BehaviorSubject({
    brandLogoUrl: this.poeSettings.value['brandLogoUrl'],
    faviconUrl: '',
    backgroundColor: this.poeSettings.value['backgroundColor'],
    actionColor: this.poeSettings.value['actionColor'],
    noticeBackgroundColor: '#14b6ac'
  });

  links$: BehaviorSubject<Links> = new BehaviorSubject({
    websiteUrl: 'https://',
    supportUrl: '',
    supportEmail: '',
    supportPhone: '',
    footerLinks: [{ name: '', url: '' }]
  });

  notif$: BehaviorSubject<object> = new BehaviorSubject({
    exp: false,

    showmessage: false,
    message: 'Your message will be displayed here',
    noticeBackgroundColor: '#14b6ac',

    delayedDeliveryMessage: 'Note: Expected delivery date is delayed. We will keep you updated!',
    delayedPickupMessage: 'Note: Expected delivery date is delayed. We will keep you updated!',
    showdelay: true
  });

  //return AppStyle
  getAppStyle(): Observable<AppStyle> {
    //this.getPoeSettings()
    return this.appStyle$.asObservable();
  }

  //return Links
  getLinks(): Observable<Links> {
    return this.links$.asObservable();
  }

  //assing poeSettings to the AppStyle and Links interface
  assignInterfaces = (poeData = this.poeSettings.value) => {
    this.appStyle$.next({
      backgroundColor: poeData['backgroundColor'],
      actionColor: poeData['actionColor'],
      noticeBackgroundColor: poeData['noticeBackgroundColor'],
      brandLogoUrl: poeData['brandLogoUrl'],
      faviconUrl: poeData['faviconUrl']
    });

    /*let obj = {
      google: 'google.com',
      contact: 'contact',
    };*/
    let footerss = [];

    if (this.poeSettings.value['footerLinks']) {
      for (let [key, val] of Object.entries(this.poeSettings.value['footerLinks'])) {
        footerss.push({ name: key, url: val });
        console.log('Links', this.links$);
      }
    }

    this.links$.next({
      websiteUrl: poeData['websiteUrl'],
      supportUrl: poeData['supportUrl'],
      supportEmail: poeData['supportEmail'],
      supportPhone: poeData['supportPhone'],
      footerLinks: footerss
    });

    this.notif$.next({
      ...this.notif$.value,
      message: poeData['noticeMessage'],
      noticeBackgroundColor: poeData['noticeBackgroundColor'],
      delayedDeliveryMessage: poeData['delayedDeliveryMessage'],
      delayedPickupMessage: poeData['delayedPickupMessage']
    });
  };

  //GET request for fetching poeSettings from Eshopbox Backend
  getPoeSettings(): Observable<any> {
    //return this.httpClient.get('https://montecarlo.auperator.co/customer-portal/api/v1/poe-setting');
    return this.httpClient.get<object>('customer-portal/api/v1/poe-setting');
  }

  updatePoeSettings(data: object) {
    console.log('new settings = ', { ...this.poeSettings.value, ...data });

    this.poeSettings.next({ ...this.poeSettings.value, ...data });

    this.httpClient.post('customer-portal/api/v1/poe-setting', JSON.stringify(data)).subscribe(newdata => {
      console.log('new data = ', newdata);
      this.poeSettings.next(newdata);
    });
  }

  postPoeSettings(data: object) {}

  saveForm(form: FormGroup, data = form.value): boolean {
    if (form.dirty && form.valid) {
      this.updatePoeSettings(data);
      form.markAsPristine();
      return false;
    } else if (form.dirty && !form.valid) {
      console.log(form.controls);
      this.alertService.showError('Enter valid values');
      //alert('Enter valid values');
      return true;
    } else {
      return false;
    }
  }

  //assign the parsed data to the interfaces and set fetched value to true
  initPoe(data) {
    this.poeSettings.next(data);
    console.log('New POE Settings\n', this.poeSettings.value);
    this.assignInterfaces(data);
    this.poeFetched.next(true);
  }

  formChanged(form: FormGroup) {
    if (form.dirty) {
      return true;
    } else {
      return false;
    }
  }

  validateError(field: FormControl) {
    if (field.hasError('required')) {
      return 'This field should not be empty';
    } else if (field.hasError('email')) {
      return 'Enter a valid email';
    } else {
      return 'Enter a valid value';
    }
  }

  //nullParser for parsing the incoming data with null string ("null") into actual null object (null)
  nullParser = (data: object) => {
    let eqData: object = Object.assign({}, data);

    Object.keys(eqData).map(function(key, index) {
      if (eqData[key] === 'null') {
        eqData[key] = null;
      } else {
      }
    });
    console.log('Eq: Data \n', eqData);
    return eqData;
  };

  constructor(private httpClient: HttpClient, private authService: AuthService, private alertService: AlertService) {
    this.AuthorizationToken = this.authService.getAuthToken();
    if (this.AuthorizationToken === undefined || this.AuthorizationToken == null) {
      //this.errorHandlingService.logoutOnError('Session timed out');
    }
    this.AuthorizationToken = 'Bearer ' + this.AuthorizationToken;
    //this.AuthorizationToken = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IlJVVXdSREZCUVRSRFFqQkdORFUxTVVZeE16ZEdPRFJHTnpORk5EaEJSVEU0TVVORk5qVTJOdyJ9.eyJpc3MiOiJodHRwczovL2VzaG9wYm94LXBheW1lbnQtcmVjby5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8NWM0MmIwMDdhMTZlNjg3ZTgxNjg5Y2Y4IiwiYXVkIjpbImh0dHBzOi8vZXNob3Bib3gtcG9ydGFsLWRldi5hcHBzcG90LmNvbSIsImh0dHBzOi8vZXNob3Bib3gtcGF5bWVudC1yZWNvLmF1dGgwLmNvbS91c2VyaW5mbyJdLCJpYXQiOjE1NTgwMDcyMjMsImV4cCI6MTU1ODI2NjQyMywiYXpwIjoieVpyNzY3QzQ1TXh5RlVETjJZMnIxZEk0ZndSQVk5bEEiLCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIGFkZHJlc3MgcGhvbmUgZGVsZXRlOnVzZXJzIiwiZ3R5IjoicGFzc3dvcmQifQ.dQDFjMmJ4Cdc69Jh2Wl63XHJFElN12J98UR5OIPOr0UGSX4Hm2V-gBR_1oZMm879rwBQGT5Qzx2p31dKoMSngAEO4KngxxrmWmGqxG3QnrLpj_irdvVhCrgxeJWjO1zTMDU1mwCR1hNplTziln7CBFSYNfHNtlqj4_0amCY81LRzclZdeOLKVbiP2i_YgwdKmSNixYdxkuagyWEYPZif-Sru-gI_YRwZzO4OkBN4VirHMi-yzPwkKqMKRlbP3EZQW173CdObaBqiEtUh-LHRxmlGxTlXdE86cUhVTuh1bzchd65r59ywKJGupIO8-R8-WhjgP0J6pzW_gVXPmwITSg';

    // Get slug url
    this.accountslug = this.authService.getAccountSlug();
    if (this.accountslug === undefined || this.accountslug == null) {
      // TODO:: redirect
    }
    this.ApiUrl = 'https://' + this.accountslug + '.' + this.ApiUrl;
    this.PaymentURL = 'https://' + this.accountslug + this.PaymentURL;
    // Set headers
    this.headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', this.AuthorizationToken);

    this.getPoeSettings().subscribe({
      next: data => {
        if (data['channelId'] === '0') {
          console.log('channelID not available. Workspace Settings');
        } else {
          console.log('channelId available. Default Channel Settings');
        }

        this.initPoe(this.nullParser(data));
      },
      error: error => {
        console.error('There was an error!\n', error);
      }
    });
  }
}
