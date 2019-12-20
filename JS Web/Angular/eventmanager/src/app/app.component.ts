import {OnInit} from '@angular/core';
import { Component, ViewChild } from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { EventInput } from '@fullcalendar/core';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGrigPlugin from '@fullcalendar/timegrid';
import * as moment from 'moment';
import interactionPlugin from '@fullcalendar/interaction'; // for dateClick
import {CalendarService} from './calendar.service';
import { MatDialog } from '@angular/material/dialog';
import {EventDialogComponent} from './event-dialog/event-dialog.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  @ViewChild('calendar',{'static':false}) 
  calendarComponent: FullCalendarComponent; // the #calendar in the template
  calendarPlugins = [dayGridPlugin, timeGrigPlugin, interactionPlugin];
  calendarVisible = true;
  calendarEvents: any[] = [
  ];
  data:any;
  constructor(
  private calendarService:CalendarService,
  public dialog: MatDialog){
	  
  }
	ngOnInit(){
		this.calendarService.getEvents().subscribe(data => {
			console.log(data);
			this.calendarEvents = data;
		});
	}
 
	setDate(evt: MatDatepickerInputEvent<Date>) {
		let moments = moment(evt.value);
	    let calendarApi = this.calendarComponent.getApi();
	    calendarApi.gotoDate(moments.format("YYYY-MM-DD")); // call a method on the Calendar object*/
	}
 
  handleDateClick(arg):void {
if (confirm('Would you like to add an event to ' + arg.dateStr + ' ?')) {
      this.calendarEvents = this.calendarEvents.concat({ // add new event data. must create new array
		doctorId:'102',
        title: 'New Event',
        start: arg.date,
		end:arg.date,
        allDay: false,
      })
    }
	  /*const dialogRef = this.dialog.open(EventDialogComponent, {
      data: {id: "Alex"},
	    width: '550px'
    });*/
  }

}