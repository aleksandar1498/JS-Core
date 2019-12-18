import {NgModule} from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';

@NgModule({
  exports: [
    MatDatepickerModule,
	MatInputModule
  ]
})
export class CustomMaterialModule { }