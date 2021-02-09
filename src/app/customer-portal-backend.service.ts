import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
  poeFetched: BehaviorSubject<boolean> = new BehaviorSubject(false);

  appStyle$: BehaviorSubject<AppStyle> = new BehaviorSubject({
    brandLogoUrl: this.poeSettings.value['brandLogoUrl'],
    faviconUrl: '',
    backgroundColor: this.poeSettings.value['backgroundColor'],
    actionColor: this.poeSettings.value['actionColor'],
    noticeBackgroundColor: '#14b6ac',
  });

  links$: BehaviorSubject<Links> = new BehaviorSubject({
    websiteUrl: 'https://',
    supportUrl: '',
    supportEmail: '',
    supportPhone: '',
    footerLinks: [{ name: '', url: '' }],
  });

  notif$: BehaviorSubject<object> = new BehaviorSubject({
    message: 'Your message will be displayed here',
    show: false,
    delaymessage:
      'Note: Expected delivery date is delayed. We will keep you updated!',
    showdelay: true,
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
      faviconUrl: poeData['faviconUrl'],
    });

    /*let obj = {
      google: 'google.com',
      contact: 'contact',
    };*/
    let footerss = [];

    if (this.poeSettings.value['footerLinks']) {
      for (let [key, val] of Object.entries(
        this.poeSettings.value['footerLinks']
      )) {
        footerss.push({ name: key, url: val });
        console.log('Links', this.links$);
      }
    }

    this.links$.next({
      websiteUrl: poeData['websiteUrl'],
      supportUrl: poeData['supportUrl'],
      supportEmail: poeData['supportEmail'],
      supportPhone: poeData['supportPhone'],
      footerLinks: footerss,
    });

    this.notif$.next({
      ...this.notif$.value,
      message: poeData['noticeMessage'],
      show: poeData['noticeMessage'],
    });
  };

  //GET request for fetching poeSettings from Eshopbox Backend
  getPoeSettings(): Observable<any> {
    //return this.httpClient.get('https://montecarlo.auperator.co/customer-portal/api/v1/poe-setting');

    return this.httpClient.get<object>(
      'https://montecarlo.auperator.co/customer-portal/api/v1/poe-setting'
    );
  }

  updatePoeSettings(data: object) {
    console.log('new settings = ', { ...this.poeSettings.value, ...data });

    this.poeSettings.next({ ...this.poeSettings.value, ...data });

    this.httpClient
      .post(
        'https://montecarlo.auperator.co/customer-portal/api/v1/poe-setting',
        JSON.stringify(data)
      )
      .subscribe((newdata) => console.log('new data = ', newdata));
  }

  postPoeSettings(data: object) {}

  saveForm(form: FormGroup, data = form.value): boolean {
    if (form.dirty && form.valid) {
      this.updatePoeSettings(data);
      form.markAsPristine();
      return false;
    } else if (form.dirty && !form.valid) {
      console.log(form.controls);
      alert('Enter valid values');
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

    Object.keys(eqData).map(function (key, index) {
      if (eqData[key] === 'null') {
        eqData[key] = null;
      } else {
      }
    });
    console.log('Eq: Data \n', eqData);
    return eqData;
  };

  constructor(private httpClient: HttpClient) {
    this.getPoeSettings().subscribe({
      next: (data) => {
        if (data['channelId'] === '0') {
          console.log('channelID not available. Workspace Settings');
        } else {
          console.log('channelId available. Default Channel Settings');
        }

        this.initPoe(this.nullParser(data));
      },
      error: (error) => {
        console.error('There was an error!\n', error);
      },
    });
  }
}
