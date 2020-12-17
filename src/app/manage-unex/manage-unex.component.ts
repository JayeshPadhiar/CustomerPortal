import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-unex',
  templateUrl: './manage-unex.component.html',
  styleUrls: ['./manage-unex.component.css', '../app.component.css']
})
export class ManageUnexComponent implements OnInit {

  @Input() appStyle;

  constructor() { }

  ngOnInit(): void {
  }

  changeNotifColor(color, prop) {
    this.appStyle[prop] = color;
    console.log(this.appStyle[prop])
    console.log(color)
  }

}
