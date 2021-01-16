import { MatDialog } from '@angular/material/dialog';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import { AppStyle, FooterLink, Links } from '../c-portal/cportal.model';
import { AddDomainComponent } from '../add-domain/add-domain.component';
import { CustomerPortalBackendService } from '../customer-portal-backend.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { MobileComponent } from '../mobile/mobile.component';
import { style } from '@angular/animations';

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
  logosrc: FormControl;
  faviconsrc: FormControl;
  backgroundcolor: FormControl;
  actioncolor: FormControl;

  domainFormGroup: FormGroup;
  domain: FormControl;

  linksFormGroup: FormGroup;
  weburl: FormControl;
  supporturl: FormControl;
  supportemail: FormControl;
  supportphone: FormControl;
  footers: FormArray;

  constructor(
    private dialog: MatDialog,
    private backendService: CustomerPortalBackendService
  ) {}

  ngOnInit(): void {
    //this.footerLinks.push(this.link);

    this.backendService.appStyle$
      .asObservable()
      .subscribe((style) => (this.appStyle = style));
    this.originalAppStyle = Object.assign({}, this.appStyle);

    this.backendService.links$
      .asObservable()
      .subscribe((links) => (this.links = links));
    this.originalLinks = Object.assign({}, this.links);

    this.createFormControls();
    this.createFormGroups();

    /*if(this.domain.value){
      console.log('Domain available: ' + this.domain.value)
      this.addDomainDiv.nativeElement.style.display = 'none'
    }else{
      console.log('Domain not available' + this.domain.value)
    }*/
  }

  createFormControls = () => {
    this.logosrc = new FormControl('');
    this.faviconsrc = new FormControl('');
    this.backgroundcolor = new FormControl(
      this.originalAppStyle.backgroundcolor
    );
    this.actioncolor = new FormControl(this.originalAppStyle.actioncolor);

    this.domain = new FormControl('www.google.com', [
      Validators.required,
      Validators.pattern(this.urlpattern),
    ]);

    this.weburl = new FormControl('https://', [
      Validators.required,
      Validators.pattern(this.urlpattern),
    ]);
    this.supporturl = new FormControl('', [
      Validators.required,
      Validators.pattern(this.urlpattern),
    ]);
    this.supportemail = new FormControl('', [
      Validators.required,
      Validators.email,
    ]);
    this.supportphone = new FormControl('', [
      Validators.required,
      Validators.pattern(this.phonepattern),
    ]);
    this.footers = new FormArray([this.newFooter()]);
  };

  createFormGroups = () => {
    this.styleFormGroup = new FormGroup({
      logosrc: this.logosrc,
      faviconsrc: this.faviconsrc,
      backgroundcolor: this.backgroundcolor,
      actioncolor: this.actioncolor,
    });

    this.domainFormGroup = new FormGroup({
      domain: this.domain,
    });

    this.linksFormGroup = new FormGroup({
      weburl: this.weburl,
      supporturl: this.supporturl,
      supportemail: this.supportemail,
      supportphone: this.supportphone,
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
    //this.backendService.setStyle(this.originalAppStyle);
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

          this.styleFormGroup.reset({
            backgroundcolor: this.originalAppStyle.backgroundcolor,
            actioncolor: this.originalAppStyle.actioncolor,
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
        console.log(domain);
        this.domainFormGroup.patchValue({ domain: domain });
      } else {
        console.log('no domain added');
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
