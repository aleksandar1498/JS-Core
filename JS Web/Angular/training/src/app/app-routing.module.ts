import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {RecordsComponent} from './records/records.component';
import {RecordsDetailsComponent} from './records-details/records-details.component';
const routes: Routes = [
{path:'home',component:HomeComponent},
{path:'records',component:RecordsComponent},
{path: 'records/:id',component: RecordsDetailsComponent},
{path:'patients',component:HomeComponent},
{path:'doctors',component:HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
