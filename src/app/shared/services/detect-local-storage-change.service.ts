import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LocalStorageChangeDetectionService {
  constructor() {}
  private storageSub = new Subject<string>();

  watchStorage(): Observable<any> {
    return this.storageSub.asObservable();
  }

  setItem(key: string, data: any) {
    localStorage.setItem(key, data);
    this.storageSub.next('added');
  }

  removeItem(key) {
    localStorage.removeItem(key);
    this.storageSub.next('removed');
  }
}
