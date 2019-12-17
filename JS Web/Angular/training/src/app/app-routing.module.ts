import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {RecordsComponent} from './records/records.component';
import {RecordsDetailsComponent} from './records-details/records-details.component';
import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import {
  MatButtonModule, MatCardModule, MatDialogModule, MatInputModule, MatTableModule,
  MatToolbarModule, MatMenuModule,MatIconModule, MatProgressSpinnerModule
} from '@angular/material';

const routes: Routes = [
{path:'home',component:HomeComponent},
{path:'records',component:RecordsComponent},
{path: 'records/:id',component: RecordsDetailsComponent},
{path:'patients',component:HomeComponent},
{path:'doctors',component:HomeComponent},
{path:'register',component:RegisterComponent},
{path:'login',component:LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
