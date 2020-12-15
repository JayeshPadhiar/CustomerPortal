import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-orch-mess',
  templateUrl: './orch-mess.component.html',
  styleUrls: ['./orch-mess.component.css', '../app.component.css']
})
export class OrchMessComponent implements OnInit {

  @Input() appStyle;

  constructor() { }

  ngOnInit(): void {
  }

}
