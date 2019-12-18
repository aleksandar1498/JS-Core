import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import {FormsModule} from '@angular/forms';
import {MatNativeDateModule} from '@angular/material/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CustomMaterialModule } from './core/material.module';
import {AppComponent} from './app.component';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
  AppRoutingModule,
    BrowserModule,
	HttpClientModule,
	FormsModule,
	MatNativeDateModule,
	BrowserAnimationsModule,
	FullCalendarModule,
	CustomMaterialModule
	
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
