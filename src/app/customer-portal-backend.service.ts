import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AppStyle, Links, FooterLink } from './c-portal/cportal.model';

@Injectable({
  providedIn: 'root',
})
export class CustomerPortalBackendService {

  appStyle$: BehaviorSubject<AppStyle> = new BehaviorSubject(null);
  links$: BehaviorSubject<Links> = new BehaviorSubject(null);

  /*changeStyle(prop, val) {
    this.appStyle$.next({... this.appStyle$.value, [prop]: val})
  }*/

  getAppStyle(): Observable<AppStyle> {
    return this.appStyle$.asObservable();
  }

  setStyle(style: AppStyle) {
    this.appStyle$.next(style);
  }

  getLinks(): Observable<Links> {
    return this.links$.asObservable();
  }

  constructor() {
    this.appStyle$.next({
      backgroundcolor: '#f6f6f6',
      actioncolor: '#2DDBD1',
      notifcolor: '#14B6AC',
      logosrc: '../../assets/img/logo.png',
      faviconsrc: '../../assets/img/favicon.png',
    });

    this.links$.next({
      weburl: '',
      supporturl: '',
      supportemail: '',
      supportphone: '',
      footers: [{ name: '', url: '' }],
    });
  }
}
