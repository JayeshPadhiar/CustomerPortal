import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private alertMessageSubject = new Subject<{
    show: boolean;
    type: string;
    content: string;
    duration?: number;
  }>();
  alertMessageState = this.alertMessageSubject.asObservable();

  constructor() {}

  showError(content: string, duration?: number) {
    this.alertMessageSubject.next({
      show: true,
      type: 'error',
      content: content,
      duration: duration
    });
  }

  showSuccess(content: string, duration?: number) {
    this.alertMessageSubject.next({
      show: true,
      type: 'success',
      content: content,
      duration: duration
    });
  }

  showInfo(content: string, duration?: number) {
    this.alertMessageSubject.next({
      show: true,
      type: 'info',
      content: content,
      duration: duration
    });
  }
}
