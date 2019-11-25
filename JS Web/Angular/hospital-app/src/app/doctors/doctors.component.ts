import { Component, OnInit } from '@angular/core';
import { Doctor } from 'src/models/Doctor';
import { DoctorService } from '../doctor.service';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css']
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


  remove(id: number) {
    this.service.remove(id).subscribe(x => {
      console.log(x);
    });
    this.service.getAllDoctors().subscribe(x => {
      this.doctors = x;
    });;
  }
  onSelect(doctor:Doctor){
    this.selectedDoctor = doctor;
  }

}
