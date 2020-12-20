import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

import { AddDomainComponent } from '../add-domain/add-domain.component';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import {
  MatDialogRef,
  MatDialog,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

import {
  ReactiveFormsModule,
  FormsModule,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';

@Component({
  selector: 'app-customize-exp',
  templateUrl: './customize-exp.component.html',
  styleUrls: ['./customize-exp.component.css', '../app.component.css'],
})
export class CustomizeExpComponent implements OnInit {
  @Input() appStyle;
  @Input() footerLinks;

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
  footers: FormControl;

  constructor(private dialog: MatDialog) {}

  createFormControls = () => {
    this.logosrc = new FormControl('');
    this.faviconsrc = new FormControl('');
    this.backgroundcolor = new FormControl(this.appStyle.background_color);
    this.actioncolor = new FormControl(this.appStyle.action_color);

    this.domain = new FormControl('');

    this.weburl = new FormControl('');
    this.supporturl = new FormControl('');
    this.supportemail = new FormControl('');
    this.supportphone = new FormControl('');
    this.footers = new FormControl(this.footerLinks);
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

  checkIfDirty(form: FormGroup) {
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
      this.resetForm(form);
    }
  }

  cancel(form: FormGroup, exp) {
    if (this.checkIfDirty(form)) {
      this.confirmDiscard(form, exp);
    } else {
      console.log('collapsing');
      this.expansions[exp] = false;
    }
  }

  confirmDiscard(form: FormGroup, exp) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      panelClass: 'confirm-dialog',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);

      if (result) {
        this.resetForm(form);
        this.expansions[exp] = false;
      } else {
        this.expansions[exp] = true;
      }
    });
  }

  resetForm(form: FormGroup) {
    form.reset();
  }

  selectIcon(event, icontype) {
    if (event.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.appStyle[icontype] = event.target.result;
      };
    }
  }

  changeColor(color, prop) {
    this.appStyle[prop] = color;
  }

  addDomain() {
    this.dialog.open(AddDomainComponent, { panelClass: 'add-domain-dialog' });
  }

  link: any = {};
  ngOnInit(): void {
    this.footerLinks.push(this.link);

    this.createFormControls();
    this.createFormGroups();

    console.log(this.footers)
  }

  addRow() {
    this.link = { name: '', url: '' };
    this.footerLinks.push(this.link);
    console.log(this.footerLinks);
    return true;
  }

  deleteRow(index) {
    if (this.footerLinks.length == 1) {
      this.footerLinks.splice(index, 1);
      return true;
    } else {
      this.footerLinks.splice(index, 1);
      return true;
    }
  }
}
