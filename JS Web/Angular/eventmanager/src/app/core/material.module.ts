import { NgModule } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
@NgModule({
  exports: [
    MatDatepickerModule,
    MatSelectModule,
    MatInputModule,
    MatDialogModule
  ]
})
export class CustomMaterialModule { }