import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  status: string = ''

  ngOnInit(): void {
    this.status = this.data['type'];
  }
  //Przekazując do metody close wartość, przesyłamy ją do miejsca skąd dialog został otwarty
  closeDialog(confirm: boolean){
    this.dialogRef.close(confirm)
  }

}
