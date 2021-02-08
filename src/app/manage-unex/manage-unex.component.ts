import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AppStyle } from '../c-portal/cportal.model';
import { CustomerPortalBackendService } from '../customer-portal-backend.service';

@Component({
  selector: 'app-manage-unex',
  templateUrl: './manage-unex.component.html',
  styleUrls: ['./manage-unex.component.css', '../app.component.css'],
})
export class ManageUnexComponent implements OnInit {
  appStyle: AppStyle;
  originalAppStyle: AppStyle;
  notif: object;

  expansions = {
    displayNotice: false,
    showMessage: false,
  };

  poeFetched: boolean = false;
  poeSettings: object;

  notice: FormGroup;
  message: FormGroup;

  constructor(
    private backendService: CustomerPortalBackendService,
    public fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.backendService
      .getAppStyle()
      .subscribe((style) => (this.appStyle = style));
    this.backendService.notif$.subscribe((result) => (this.notif = result));

    this.backendService.poeFetched.subscribe((fetched) => {
      this.poeFetched = fetched;
    });

    if (this.backendService.poeFetched.getValue()) {
      console.log('poeSettings already fetched');
      this.initialize();
    } else {
      this.backendService.getPoeSettings().subscribe({
        next: (data) => {
          if (data['channelId'] === '0') {
            console.log('channelID not available. Workspace Settings');
          } else {
            console.log('channelId available. Default Channel Settings');
          }

          this.backendService.initPoe(data);

          this.initialize();
        },
        error: (error) => {
          console.error('There was an error!\n', error);
        },
      });
    }

    this.createFormGroup();
  }

  initialize() {
    this.backendService.poeSettings.asObservable().subscribe((poe) => {
      this.poeSettings = poe;
    });

    this.backendService.appStyle$.asObservable().subscribe((style) => {
      this.appStyle = Object.assign({}, style);
    });
    this.originalAppStyle = Object.assign({}, this.appStyle);

    this.createFormGroup();
  }

  changeColor(color, prop) {
    //this.backendService.changeStyle(prop, color);
    this.backendService.appStyle$.next({ ...this.appStyle, [prop]: color });
  }

  createFormGroup() {
    this.notice = this.fb.group({
      noticeMessage: this.fb.control(this.poeSettings['noticeMessage']),
      noticeBackgroundColor: this.fb.control(
        this.poeSettings['noticeBackgroundColor']
      ),
    });

    this.message = this.fb.group({
      message: this.fb.control(this.poeSettings['noticeMessage']),
    });
  }

  changeNotifColor(color, prop) {
    this.appStyle[prop] = color;
    console.log(this.appStyle[prop]);
    console.log(color);

    this.backendService.appStyle$.next({ ...this.appStyle, [prop]: color });
  }

  isChanged(form: FormGroup) {
    return this.backendService.formChanged(form);
  }

  submitNotice() {
    this.expansions.displayNotice = this.backendService.saveForm(this.notice);
  }

  toggle(checked: boolean){
    this.notif['show'] = checked

    if (checked){

    }else{
      this.notice.controls['noticeMessage'].patchValue('');
      this.notice.markAsDirty();
    }

  }

  save() {}
}
