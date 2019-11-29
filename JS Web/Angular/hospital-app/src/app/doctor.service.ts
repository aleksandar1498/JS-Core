import { Injectable } from '@angular/core';
import { Doctor } from 'src/models/Doctor';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {


  private username = "alex";
  private password = "alex";
  constructor(private http: HttpClient) {

  }

  getAllDoctors(): Observable<Doctor[]> {
    // ORIGINAL URL  https://baas.kinvey.com/appdata/kid_ByY4kawhB/doctors

    // TESTING URL http://localhost:8080/medic/rest/doctors
    return this.http.get<Doctor[]>("http://localhost:8080/rest-medic-0.0.1-SNAPSHOT/rest/doctors", {
      headers: {
        "Content-Type": "application/json",
      }
    }).pipe(map(res => {
      let doctors = [];
      for (const d of res) {
        doctors.push(new Doctor(d['id'], d['name'], d['rating'], d['active']));
      }
      return doctors;
    }));
  }


  remove(id: number) {
    return this.http.delete(`http://localhost:8080/rest-medic-0.0.1-SNAPSHOT/rest/doctors/${id}`, {

      headers: { "Content-Type": "application/json", }

    }).pipe(map(res => {
      let doctors = [];
      for (const i in res) {
        doctors.push(new Doctor(res[i]['id'],res[i]['name'], res[i]['rating'], res[i]['active']));
      }
      return doctors;
    }));

  }

  updateDoctor(selectedDoctor: Doctor) {

    console.log("SERVICE", selectedDoctor);
    return this.http.put(`https://baas.kinvey.com/appdata/kid_ByY4kawhB/doctors/${selectedDoctor._id}`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Basic ${btoa(`${this.username}:${this.password}`)}`
      },
      body: JSON.stringify(selectedDoctor)
    });
  }


}
