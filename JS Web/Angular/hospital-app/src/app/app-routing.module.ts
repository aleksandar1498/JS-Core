import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DoctorsComponent } from './doctors/doctors.component';
import { AppComponent } from './app.component';


const routes: Routes = [
  {
    path : 'doctors' , component : DoctorsComponent
  },
  {
    path : '' , component : AppComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
