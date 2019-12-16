import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {RouterModule,Routes} from '@angular/router';
import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroesEditComponent} from './heroes-edit/heroes-edit.component';
import { HeroesService } from './heroes.service';
const appRoutes: Routes = [
  {path:'heroes' , component : HeroesComponent},
 {path:'hero/:id' , component : HeroesEditComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroesEditComponent,
   ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule,
    RouterModule.forRoot(
      appRoutes,
    )
  ],
  providers: [HeroesService],
  bootstrap: [AppComponent]
})
export class AppModule { }


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/