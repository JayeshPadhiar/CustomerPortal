import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Pusher from 'pusher-js';
import { Observable, Subject } from 'rxjs';
import { stat } from 'fs';

@Injectable({ providedIn: 'root' })
export class SocketService {
  PUSHER_KEY = 'a1d1428887a289f13b86';
  PUSHER_CLUSTER = 'ap2';
  CHANNEL = 'my-channel';
  APP_ID = '914753';
  PUSHER_SECRET_KEY = '30cf2052248c6f3d3991';

  pusher: any;
  channel: any;
  importJob: Subject<any> = new Subject<any>();

  constructor(private http: HttpClient) {
    this.on();
    this.listen();
  }

  on() {
    this.pusher = new Pusher(this.PUSHER_KEY, { cluster: this.PUSHER_CLUSTER });
    this.channel = this.pusher.subscribe(this.CHANNEL);
  }

  listen() {
    this.channel.bind('my-event', response => {
      this.importJob.next(response);
      for (let status in response) {
        console.log('status', status);
        if (status === 'IMPORT JOB COMPLETED' || status === 'IMPORT JOB FAILED') {
          //INCREASE COUNT
        }
      }
    });
  }

  getImportJobFeed(): Observable<any> {
    return this.importJob.asObservable();
  }
}
