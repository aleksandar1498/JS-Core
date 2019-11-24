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

  constructor(private service: DoctorService) {


  }

  ngOnInit() {
   this.service.getAllDoctors().subscribe(x => {
     console.log(x);
   });
   // this.doctors = this.service.getAllDoctors();
  }

  toggleStatus(id: number) {
    this.service.toggleStatus(id);
  }
  remove(id: number) {
    this.service.remove(id);
   // this.doctors = this.service.getAllDoctors();
  }

}
