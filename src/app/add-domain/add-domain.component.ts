import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-domain',
  templateUrl: './add-domain.component.html',
  styleUrls: ['./add-domain.component.css']
})
export class AddDomainComponent implements OnInit {
  domain: String = 'https://';

  constructor(public dialogRef: MatDialogRef<AddDomainComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {}

  save(): void {
    this.dialogRef.close(this.domain);
  }

  close(): void {
    this.dialogRef.close();
  }
}
