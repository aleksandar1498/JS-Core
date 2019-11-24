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
  private password = "alex"
  constructor(private http: HttpClient) {

  }

  getAllDoctors(): Observable<Doctor[]> {
    return this.http.get<Doctor[]>("https://baas.kinvey.com/appdata/kid_ByY4kawhB/doctors", {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Basic ${btoa(`${this.username}:${this.password}`)}`
      }
    }).pipe(map(res => {
      let doctors = [];
      for (const d of res) {
        doctors.push(new Doctor(d._id, d.name, d.rating, d.active));
      }
      return doctors;
    }));
  }


  remove(id: number) {
    console.log(id);

    return this.http.delete(`https://baas.kinvey.com/appdata/kid_ByY4kawhB/doctors/${id}`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Basic ${btoa(`${this.username}:${this.password}`)}`
      }
    });
  }

}
