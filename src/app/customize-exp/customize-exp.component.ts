import { Component, Input, OnInit } from '@angular/core';

import { AddDomainComponent } from '../add-domain/add-domain.component';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import {
  MatDialogRef,
  MatDialog,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

@Component({
  selector: 'app-customize-exp',
  templateUrl: './customize-exp.component.html',
  styleUrls: ['./customize-exp.component.css', '../app.component.css'],
})
export class CustomizeExpComponent implements OnInit {
  @Input() appStyle;
  @Input() footerLinks;

  constructor(private dialog: MatDialog) {}

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
    console.log(this.appStyle[prop]);
    console.log(color);
  }

  addDomain() {
    this.dialog.open(AddDomainComponent, { panelClass: 'add-domain-dialog' });
  }

  link: any = {};
  ngOnInit(): void {
    this.footerLinks.push(this.link);
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