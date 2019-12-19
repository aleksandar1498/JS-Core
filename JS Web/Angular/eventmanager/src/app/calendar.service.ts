import { Injectable } from '@angular/core';

import { Observable,of} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CalendarService {
	calendarEvents: any[] = [
		{title: 'Appointment A',start: "2019-12-15 05:30"},
		{title: 'Appointment B',start: "2019-12-17 13:10"}
	];
 getEvents():Observable<any>{
	 return of(this.calendarEvents);
 }
}
