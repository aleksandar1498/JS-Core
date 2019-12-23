import { Component, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {OnInit} from '@angular/core';


@Component({
  selector: 'app-event-dialog',
  templateUrl: './event-dialog.component.html',
  styleUrls: ['./event-dialog.component.css']
})
export class EventDialogComponent implements OnInit{
 
  constructor(public dialogRef: MatDialogRef<EventDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    console.log(this.data);
    console.log(this.data.keys);
	}

  onNoClick(): void {
    this.dialogRef.close();
  }
	
  ngOnInit(){
	  
  }

}
