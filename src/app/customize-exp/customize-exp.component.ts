import { MatDialog } from '@angular/material/dialog';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import { AppStyle, FooterLink, Links } from '../c-portal/cportal.model';
import { AddDomainComponent } from '../add-domain/add-domain.component';
import { CustomerPortalBackendService } from '../customer-portal-backend.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { MobileComponent } from '../mobile/mobile.component';
import { style } from '@angular/animations';
import { resourceUsage } from 'process';

@Component({
  selector: 'app-customize-exp',
  templateUrl: './customize-exp.component.html',
  styleUrls: ['./customize-exp.component.css', '../app.component.css'],
})
export class CustomizeExpComponent implements OnInit {
  appStyle: AppStyle;
  originalAppStyle: AppStyle;

  links: Links;
  originalLinks: Links;

  urlpattern = /((?:(http|https|Http|Https|rtsp|Rtsp):\/\/(?:(?:[a-zA-Z0-9\$\-\_\.\+\!\*\'\(\)\,\;\?\&\=]|(?:\%[a-fA-F0-9]{2})){1,64}(?:\:(?:[a-zA-Z0-9\$\-\_\.\+\!\*\'\(\)\,\;\?\&\=]|(?:\%[a-fA-F0-9]{2})){1,25})?\@)?)?((?:(?:[a-zA-Z0-9][a-zA-Z0-9\-]{0,64}\.)+(?:(?:aero|arpa|asia|a[cdefgilmnoqrstuwxz])|(?:biz|b[abdefghijmnorstvwyz])|(?:cat|com|coop|c[acdfghiklmnoruvxyz])|d[ejkmoz]|(?:edu|e[cegrstu])|f[ijkmor]|(?:gov|g[abdefghilmnpqrstuwy])|h[kmnrtu]|(?:info|int|i[delmnoqrst])|(?:jobs|j[emop])|k[eghimnrwyz]|l[abcikrstuvy]|(?:mil|mobi|museum|m[acdghklmnopqrstuvwxyz])|(?:name|net|n[acefgilopruz])|(?:org|om)|(?:pro|p[aefghklmnrstwy])|qa|r[eouw]|s[abcdeghijklmnortuvyz]|(?:tel|travel|t[cdfghjklmnoprtvwz])|u[agkmsyz]|v[aceginu]|w[fs]|y[etu]|z[amw]))|(?:(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9])\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9]|0)\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9]|0)\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[0-9])))(?:\:\d{1,5})?)(\/(?:(?:[a-zA-Z0-9\;\/\?\:\@\&\=\#\~\-\.\+\!\*\'\(\)\,\_])|(?:\%[a-fA-F0-9]{2}))*)?(?:\b|$)/gi;
  phonepattern = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

  //footerLinks: Array<FooterLink>;
  //footerLinks: Array<FooterLink>;

  expansions = {
    styleExp: false,
    domainExp: false,
    linksExp: false,
  };

  styleFormGroup: FormGroup;
  brandLogoUrl: FormControl;
  faviconUrl: FormControl;
  backgroundColor: FormControl;
  actionColor: FormControl;

  domainFormGroup: FormGroup;
  trackingPageDomain: FormControl;

  linksFormGroup: FormGroup;
  websiteUrl: FormControl;
  supportUrl: FormControl;
  supportEmail: FormControl;
  supportPhone: FormControl;
  footers: FormArray;

  poeFetched: boolean;
  poeSettings : object;

  constructor(
    private dialog: MatDialog,
    public backendService: CustomerPortalBackendService
  ) {}

  ngOnInit() {
    //this.footerLinks.push(this.link);

    this.initialize();

    this.backendService.poeFetched.subscribe((fetched) => {
      this.poeFetched = fetched;
    });

    if (this.backendService.poeFetched.getValue()) {

      console.log('poeSettings already fetched')
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

    console.log('val ' + this.backendService.poeFetched.value);
  }

  initialize() {
    this.backendService.appStyle$.asObservable().subscribe((style) => {
      this.appStyle = Object.assign({}, style);
    });
    this.originalAppStyle = Object.assign({}, this.appStyle);

    this.backendService.links$.asObservable().subscribe((links) => {
      this.links = Object.assign({}, links);
    });
    this.originalLinks = Object.assign({}, this.links);

    this.createFormControls();
    this.createFormGroups();
  }

  createFormControls = () => {
    this.brandLogoUrl = new FormControl('');
    this.faviconUrl = new FormControl('');
    this.backgroundColor = new FormControl(this.appStyle['backgroundColor']);
    this.actionColor = new FormControl(this.appStyle['actionColor']);

    this.trackingPageDomain = new FormControl('www.google.com', [
      Validators.required,

      Validators.pattern(this.urlpattern),
    ]);

    this.websiteUrl = new FormControl(this.links['websiteUrl'], [
      Validators.required,
      Validators.pattern(this.urlpattern),
    ]);
    this.supportUrl = new FormControl(this.links['supportUrl'], [
      Validators.required,
      Validators.pattern(this.urlpattern),
    ]);
    this.supportEmail = new FormControl(this.links['supportEmail'], [
      Validators.required,
      Validators.email,
    ]);
    this.supportPhone = new FormControl(this.links['supportPhone'], [
      Validators.required,
      Validators.pattern(this.phonepattern),
    ]);
    this.footers = new FormArray([]);
  };

  createFormGroups = () => {
    this.styleFormGroup = new FormGroup({
      brandLogoUrl: this.brandLogoUrl,
      faviconUrl: this.faviconUrl,
      backgroundColor: this.backgroundColor,
      actionColor: this.actionColor,
    });

    this.domainFormGroup = new FormGroup({
      trackingPageDomain: this.trackingPageDomain,
    });

    this.linksFormGroup = new FormGroup({
      websiteUrl: this.websiteUrl,
      supportUrl: this.supportUrl,
      supportEmail: this.supportEmail,
      supportPhone: this.supportPhone,
      footers: this.footers,
    });
  };

  selectIcon(icontype, event) {
    if (window.FileReader) {
      var file = event.target.files[0];
      var reader = new FileReader();
      if (file && file.type.match('image.*')) {
        reader.readAsDataURL(file);
      } else {
        console.log('Choose correct file');
      }
      reader.onloadend = (event) => {
        this.backendService.appStyle$.next({
          ...this.appStyle,
          [icontype]: event.target.result,
        });
      };
    }
  }

  cancelIconSelect(icontype) {
    this.styleFormGroup.controls[icontype].reset();
    this.backendService.appStyle$.next({
      ...this.appStyle,
      [icontype]: this.originalAppStyle[icontype],
    });
  }

  changeColor(color, prop) {
    //this.backendService.changeStyle(prop, color);
    this.backendService.appStyle$.next({ ...this.appStyle, [prop]: color });
  }

  cancelStyle() {
    if (this.dirty(this.styleFormGroup)) {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        panelClass: 'confirm-dialog',
        data: {},
      });

      dialogRef.afterClosed().subscribe((result: Boolean) => {
        if (result) {
          console.log('baba re baba');

          this.backendService.assignInterfaces();

          this.styleFormGroup.reset({
            backgroundColor: this.originalAppStyle.backgroundColor,
            actionColor: this.originalAppStyle.actionColor,
          });

          //this.backendService.setStyle(this.originalAppStyle);
          this.backendService.appStyle$.next(this.originalAppStyle);

          console.log(this.styleFormGroup);
          console.log('collapsing after discarding');
          this.expansions['styleExp'] = false;
        }
      });
    } else {
      console.log('collapsing');
      this.expansions['styleExp'] = false;
    }
  }

  addDomain() {
    const dialogRef = this.dialog.open(AddDomainComponent, {
      panelClass: 'add-domain-dialog',
    });

    dialogRef.afterClosed().subscribe((domain: String) => {
      if (domain) {
        this.trackingPageDomain.patchValue(domain);
        this.trackingPageDomain.markAsDirty();
        console.log(this.domainFormGroup);
      } else {
        console.log('No domain added');
      }
    });
  }

  changeLink(type, val) {
    this.backendService.links$.next({ ...this.links, [type]: val });
  }

  newFooter(): FormGroup {
    return new FormGroup({
      name: new FormControl('', [Validators.required]),
      url: new FormControl('https://', [
        Validators.required,
        Validators.pattern(
          /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
        ),
      ]),
    });
  }

  addFooter() {
    this.footers.push(this.newFooter());
    this.links.footers.push({ name: '', url: '' });
  }

  removeFooter(index) {
    this.footers.removeAt(index);
    this.links.footers.splice(index, 1);

    /*if (this.footerLinks.length == 1) {
      this.footerLinks.splice(index, 1);
      this.removeFooter(index)
      return true;
    } else {
      this.footerLinks.splice(index, 1);
      this.removeFooter(index)
      return true;
    }*/
  }

  get getFooterLinks() {
    return this.linksFormGroup.get('footers') as FormArray;
  }

  dirty(form: FormGroup) {
    if (form.dirty) {
      console.log('Form was changed');
      return true;
    } else {
      console.log('Form was not changed');
      return false;
    }
  }

  onSubmit(form: FormGroup) {
    if (form.valid) {
      console.log(form.value);
      console.log('Form Submitted!');
      //this.resetForm(form);
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

  /*addRow() {
    this.footerLinks = [...this.footers.value]
    //console.log(this.footerLinks);

    //this.footerLinks = this.footers.value.slice();
    this.addFooter();

    //console.log(this.footers.value[length]);
    console.log(this.footers.value);
    console.log(this.footerLinks)
    
    return true;
  }

  deleteRow(index) {
    if (this.footerLinks.length == 1) {
      this.footerLinks.splice(index, 1);
      this.removeFooter(index)
      return true;
    } else {
      this.footerLinks.splice(index, 1);
      this.removeFooter(index)
      return true;
    }
  }*/

  //link: any = { name: '', url: '' };
}
