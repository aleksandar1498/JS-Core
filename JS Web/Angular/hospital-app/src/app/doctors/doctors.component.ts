import { Component, OnInit, Injectable } from '@angular/core';
import { Doctor } from 'src/models/Doctor';
import { DoctorService } from '../doctor.service';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class DoctorsComponent implements OnInit {
  doctors: Doctor[];
  selectedDoctor:Doctor;
  constructor(private service: DoctorService) {


  }

  ngOnInit() {
    this.service.getAllDoctors().subscribe(x => {
      this.doctors = x;
    });
    // this.doctors = this.service.getAllDoctors();
  }


  remove(event,id: number) {
    event.stopPropagation();
    this.service.remove(id).subscribe(res => {
     this.doctors = res;
    });
  }
  onSelect(doctor:Doctor){
    this.selectedDoctor = doctor;
  }

}
