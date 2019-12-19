import {NgModule} from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
@NgModule({
  exports: [
    MatDatepickerModule,
	MatInputModule,
	MatDialogModule
  ]
})
export class CustomMaterialModule { }