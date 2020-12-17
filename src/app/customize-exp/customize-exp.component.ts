import { Component, Input, OnInit } from '@angular/core';

import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {AddDomainComponent} from '../add-domain/add-domain.component'

@Component({
  selector: 'app-customize-exp',
  templateUrl: './customize-exp.component.html',
  styleUrls: ['./customize-exp.component.css', '../app.component.css']
})
export class CustomizeExpComponent implements OnInit {

  @Input() appStyle;

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  selectIcon(event, icontype) {
    if(event.target.files){
      var reader = new FileReader()
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.appStyle[icontype] = event.target.result;
      }
    }

  }

  selectFavicon(event) {
    if(event.target.files){
      var reader = new FileReader()
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.appStyle["faviconsrc"] = event.target.result;
      }
    }
  }

  changeColor(color, prop) {
    this.appStyle[prop] = color;
    console.log(this.appStyle[prop])
    console.log(color)
  }

  addDomain() {
    this.dialog.open(AddDomainComponent, {panelClass:'add-domain-dialog'});
}

}
