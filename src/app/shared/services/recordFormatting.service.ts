import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShowHideColumnServiceService {
  private showHideArray = new BehaviorSubject('');
  currentMessage = this.showHideArray.asObservable();

  constructor() {}

  changeMessage(message: string) {
    this.showHideArray.next(message);
  }
}
