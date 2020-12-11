import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-c-portal',
  templateUrl: './c-portal.component.html',
  styleUrls: ['./c-portal.component.css', '../app.component.css']
})
export class CPortalComponent implements OnInit {

  panelOpenState = false;

  constructor() { }

  ngOnInit(): void {
  }

}
