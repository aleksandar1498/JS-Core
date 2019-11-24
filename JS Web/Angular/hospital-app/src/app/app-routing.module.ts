import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DoctorsComponent } from './doctors/doctors.component';
import { AppComponent } from './app.component';
import { PatientsComponent } from './patients/patients.component';


const routes: Routes = [
  {
    path : 'doctors' , component : DoctorsComponent
  },
  {
    path : 'patients' , component : PatientsComponent
  },
  {
    path : '' , redirectTo : 'doctors' ,pathMatch : 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
