import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-customize-exp',
  templateUrl: './customize-exp.component.html',
  styleUrls: ['./customize-exp.component.css', '../app.component.css']
})
export class CustomizeExpComponent implements OnInit {

  @Input() appStyle;

  constructor() { }

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

}
