import { Component, OnInit , Input } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { Doctor } from 'src/models/Doctor';

@Component({
  selector: 'app-doctor-details',
  templateUrl: './doctor-details.component.html',
  styleUrls: ['./doctor-details.component.css']
})

export class DoctorDetailsComponent implements OnInit {
  
  @Input() selectedDoctor: Doctor;
  constructor() { }

  ngOnInit() {
  }

}
