import { Directive, ElementRef, HostListener} from '@angular/core';
import { DoctorsComponent } from './doctors/doctors.component';

@Directive({
  selector: '[appSort]'
})
export class SortDirective {
 
  constructor(el: ElementRef,private doctorComponent: DoctorsComponent) {
    
   }
  @HostListener('click',['$event']) 
  onClick(event:Event){
    this.sort();
  }
  sort(){
    this.doctorComponent.doctors.sort((a,b) => {
      return a.name.localeCompare(b.name);
    });
  }
}
