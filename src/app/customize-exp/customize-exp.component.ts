import { MatDialog } from '@angular/material/dialog';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import { AppStyle, FooterLink, Links } from '../c-portal/cportal.model';
import { AddDomainComponent } from '../add-domain/add-domain.component';
import { CustomerPortalBackendService } from '../../../shared/services/customer-portal-backend.service';
import { AlertService } from '../../../shared/services/alert.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { MobileComponent } from '../mobile/mobile.component';
import { style } from '@angular/animations';

@Component({
  selector: 'app-customize-exp',
  templateUrl: './customize-exp.component.html',
  styleUrls: ['./customize-exp.component.css', '../../customer-portal.component.css']
})
export class CustomizeExpComponent implements OnInit {
  appStyle: AppStyle;
  originalAppStyle: AppStyle;

  links: Links;
  originalLinks: Links;

  urlpattern = /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/;
  phonepattern = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
  colorpattern = /^#[0-9a-f]{3}([0-9a-f]{3})?$/i;

  //footerLinks: Array<FooterLink>;
  //footerLinks: Array<FooterLink>;

  expansions = {
    styleExp: false,
    domainExp: false,
    linksExp: false
  };

  files = [];

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
  footerLinks: FormArray;

  poeFetched: boolean;
  poeSettings: object;

  constructor(
    private dialog: MatDialog,
    public backendService: CustomerPortalBackendService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    //this.footerLinks.push(this.link);

    //this.initialize();

    this.backendService.poeFetched.subscribe(fetched => {
      this.poeFetched = fetched;
    });

    if (this.backendService.poeFetched.getValue()) {
      console.log('poeSettings already fetched');
      this.initialize();
    } else {
      this.backendService.getPoeSettings().subscribe({
        next: data => {
          if (data['channelId'] === '0') {
            console.log('channelID not available. Workspace Settings');
          } else {
            console.log('channelId available. Default Channel Settings');
          }

          this.backendService.initPoe(data);

          this.initialize();
        },
        error: error => {
          console.error('There was an error!\n', error);
        }
      });
    }

    console.log('val ' + this.backendService.poeFetched.value);
  }

  //get required data from the CustomerPortalBackendService and assign it to the forms and previews
  initialize() {
    this.backendService.poeSettings.asObservable().subscribe(poe => {
      this.poeSettings = poe;
    });

    this.backendService.appStyle$.asObservable().subscribe(style => {
      this.appStyle = Object.assign({}, style);
    });
    this.originalAppStyle = Object.assign({}, this.appStyle);

    this.backendService.links$.asObservable().subscribe(links => {
      this.links = Object.assign({}, links);
    });
    this.originalLinks = Object.assign({}, this.links);

    this.createFormControls();
    this.createFormGroups();
  }

  //create form controls
  createFormControls = () => {
    this.brandLogoUrl = new FormControl(this.appStyle['brandLogoUrl']);
    this.faviconUrl = new FormControl(this.appStyle['faviconUrl']);
    this.backgroundColor = new FormControl(this.appStyle['backgroundColor'], [
      Validators.required,
      Validators.pattern(this.colorpattern)
    ]);
    this.actionColor = new FormControl(this.appStyle['actionColor'], [
      Validators.required,
      Validators.pattern(this.colorpattern)
    ]);

    this.trackingPageDomain = new FormControl(this.poeSettings['trackingPageDomain'], [
      Validators.required,
      Validators.pattern(this.urlpattern)
    ]);

    this.websiteUrl = new FormControl(this.links['websiteUrl'], [
      Validators.required,
      Validators.pattern(this.urlpattern)
    ]);
    this.supportUrl = new FormControl(this.links['supportUrl'], [
      Validators.required,
      Validators.pattern(this.urlpattern)
    ]);
    this.supportEmail = new FormControl(this.links['supportEmail'], [Validators.required, Validators.email]);
    this.supportPhone = new FormControl(this.links['supportPhone'], [
      Validators.required,
      Validators.pattern(this.phonepattern)
    ]);
    this.footerLinks = new FormArray([]);

    this.links['footerLinks'].forEach(footer => {
      this.footerLinks.push(this.newFooter(footer['name'].toString(), footer['url'].toString()));
    });
  };

  //create form groups
  createFormGroups = () => {
    this.styleFormGroup = new FormGroup({
      brandLogoUrl: this.brandLogoUrl,
      faviconUrl: this.faviconUrl,
      backgroundColor: this.backgroundColor,
      actionColor: this.actionColor
    });

    this.domainFormGroup = new FormGroup({
      trackingPageDomain: this.trackingPageDomain
    });

    this.linksFormGroup = new FormGroup({
      websiteUrl: this.websiteUrl,
      supportUrl: this.supportUrl,
      supportEmail: this.supportEmail,
      supportPhone: this.supportPhone,
      footerLinks: this.footerLinks
    });
  };

  selectIcon(icontype, event, maxw, maxh) {
    if ((window as any).FileReader) {
      var file = event.target.files[0];
      var reader = new FileReader();
      if (file && file.type.match('image.*')) {
        reader.readAsDataURL(file);
      } else {
        this.alertService.showError('Please upload Image file only');
      }
      reader.onloadend = (e: any) => {
        var icon = new Image();

        icon.src = e.target.result.toString();

        icon.onload = () => {
          let height = icon.height;
          let width = icon.width;

          if (height > maxh || width > maxw) {
            this.alertService.showError(`Please upload your logo in recommended size i.e. ${maxw}x${maxh}px`);
          } else {
            console.log('Valid image added');

            this.files.push(file);
            console.log(this.files);

            this.backendService.appStyle$.next({
              ...this.appStyle,
              [icontype]: e.target.result
            });
          }
        };
      };
    }
  }

  copyMessage(val: string) {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  cancelIconSelect(icontype) {
    this.styleFormGroup.controls[icontype].reset();
    this.backendService.appStyle$.next({
      ...this.appStyle,
      [icontype]: this.originalAppStyle[icontype]
    });

    this.files.pop();
    console.log('deleted', this.files);
  }

  changeColor(color, prop) {
    //this.backendService.changeStyle(prop, color);
    this.backendService.appStyle$.next({ ...this.appStyle, [prop]: color });
  }

  cancelStyle() {
    if (this.dirty(this.styleFormGroup)) {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        panelClass: 'confirm-dialog',
        data: {}
      });

      dialogRef.afterClosed().subscribe((result: Boolean) => {
        if (result) {
          //console.log('baba re baba');

          this.backendService.assignInterfaces();

          this.styleFormGroup.reset({
            backgroundColor: this.originalAppStyle.backgroundColor,
            actionColor: this.originalAppStyle.actionColor
          });

          //this.backendService.setStyle(this.originalAppStyle);
          this.backendService.appStyle$.next(this.originalAppStyle);

          console.log(this.styleFormGroup);
          console.log('collapsing after discarding');
          this.expansions['styleExp'] = false;
        } else {
          this.expansions['styleExp'] = true;
          console.log('Expanding again');
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
      data: this.domainFormGroup
    });

    dialogRef.afterClosed().subscribe((domain: String) => {
      if (domain) {
        domain = domain.replace('https://', '');

        this.trackingPageDomain.patchValue(domain);
        this.trackingPageDomain.markAsDirty();
        console.log(this.domainFormGroup);
      } else {
        console.log('No domain added');
      }
    });
  }

  cancelDomain() {
    /*this.domainFormGroup = new FormGroup({
      trackingPageDomain: this.trackingPageDomain,
    });*/

    if (this.dirty(this.domainFormGroup)) {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        panelClass: 'confirm-dialog',
        data: {}
      });

      dialogRef.afterClosed().subscribe((result: Boolean) => {
        if (result) {
          //console.log('baba re baba');
          this.backendService.assignInterfaces();

          this.domainFormGroup.reset({
            trackingPageDomain: this.poeSettings['trackingPageDomain']
          });

          //this.backendService.setStyle(this.originalAppStyle);
          console.log('collapsing after discarding');
          this.expansions['domainExp'] = false;
        } else {
          this.expansions['domainExp'] = true;
          console.log('Expanding again');
        }
      });
    } else {
      console.log('collapsing');
      this.expansions['domainExp'] = false;
    }
  }

  cancelLinks() {
    if (this.dirty(this.linksFormGroup)) {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        panelClass: 'confirm-dialog',
        data: {}
      });

      dialogRef.afterClosed().subscribe((result: Boolean) => {
        if (result) {
          //console.log('baba re baba');
          this.backendService.assignInterfaces();

          this.createFormControls();
          this.createFormGroups();

          //this.backendService.setStyle(this.originalAppStyle);
          console.log('collapsing after discarding');
          this.expansions['linksExp'] = false;
        } else {
          this.expansions['linksExp'] = true;
          console.log('Expanding again');
        }
      });
    } else {
      console.log('collapsing');
      this.expansions['linksExp'] = false;
    }
  }

  changeLink(type, val) {
    this.backendService.links$.next({ ...this.links, [type]: val });
  }

  newFooter(name = '', url = ''): FormGroup {
    return new FormGroup({
      name: new FormControl(name, [Validators.required]),
      url: new FormControl(url, [Validators.required, Validators.pattern(this.urlpattern)])
    });
  }

  addFooter(name = '', url = 'https://') {
    this.footerLinks.push(this.newFooter());
    this.links.footerLinks.push({ name: name, url: url });
  }

  removeFooter(index) {
    this.footerLinks.removeAt(index);
    this.links.footerLinks.splice(index, 1);

    this.linksFormGroup.markAsDirty();

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
    return this.linksFormGroup.get('footerLinks') as FormArray;
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

  isChanged(form: FormGroup) {
    return this.backendService.formChanged(form);
  }

  onSubmit(form: FormGroup) {
    if (form.valid) {
      console.log(form.value);
      console.log('Form Submitted!');
      //this.resetForm(form);
    }
  }

  saveDomain = () => {
    this.expansions.domainExp = this.backendService.saveForm(this.domainFormGroup);
  };

  saveStyle = () => {
    this.expansions.styleExp = this.backendService.saveForm(this.styleFormGroup);
    this.originalAppStyle = Object.assign({}, this.appStyle);

    /*if (this.styleFormGroup.dirty && this.styleFormGroup.valid) {
      this.backendService.updatePoeSettings(this.styleFormGroup.value);
      this.styleFormGroup.markAsPristine();
      this.expansions.styleExp = false;
    } else if (this.styleFormGroup.dirty && !this.styleFormGroup.valid) {
      alert('Enter valid values');
    } else {
      this.expansions.styleExp = false;
    }*/
  };

  saveLinks = () => {
    let footerlinksobject = {};
    let footers: Array<object> = this.linksFormGroup.value['footerLinks'];
    footers.forEach(footer => {
      footerlinksobject[footer['name']] = footer['url'];
    });

    console.log(footerlinksobject);

    let linksObject = {
      ...this.linksFormGroup.value,
      footerLinks: footerlinksobject
    };

    console.log(linksObject);

    this.expansions.linksExp = this.backendService.saveForm(this.linksFormGroup, linksObject);
    this.originalLinks = Object.assign({}, this.links);

    /*if (this.linksFormGroup.dirty && this.linksFormGroup.valid) {
      this.backendService.updatePoeSettings(this.linksFormGroup.value);
      this.styleFormGroup.markAsPristine();
      this.expansions.styleExp = false;
    } else if (this.styleFormGroup.dirty && !this.styleFormGroup.valid) {
      alert('Enter valid values');
    } else {
      this.expansions.styleExp = false;
    }*/
  };

  validateError(field: FormControl) {
    return this.backendService.validateError(field);
  }

  /*addRow() {
    this.footerLinks = [...this.footerLinks.value]
    //console.log(this.footerLinks);

    //this.footerLinks = this.footerLinks.value.slice();
    this.addFooter();

    //console.log(this.footerLinks.value[length]);
    console.log(this.footerLinks.value);
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
