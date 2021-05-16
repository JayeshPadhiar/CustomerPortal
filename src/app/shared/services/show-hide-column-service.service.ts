import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShowHideColumnServiceService {
  private showHideArray: BehaviorSubject<Array<any>> = new BehaviorSubject([]);
  private bbName: BehaviorSubject<String> = new BehaviorSubject('');
  currentMessage = this.showHideArray.asObservable();

  constructor() {}

  changeMessage(message: string, bbName) {
    console.log(message);
    if (message !== '*') {
      const currVal = this.showHideArray.value;
      let updatedVal;
      if (!currVal.includes(message)) {
        updatedVal = [...currVal, message];
      } else {
        currVal.splice(currVal.indexOf(message), 1);
        updatedVal = [...currVal];
      }
      this.showHideArray.next(updatedVal);
    } else {
      if (bbName !== this.bbName.getValue()) {
        console.log('In Service Else');
        this.showHideArray.next([]);
        this.bbName.next(bbName);
      }
    }

    console.log(this.showHideArray.value);
    console.log(this.bbName.value);
  }
}
