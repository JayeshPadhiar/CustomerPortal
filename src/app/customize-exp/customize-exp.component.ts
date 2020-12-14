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

}
