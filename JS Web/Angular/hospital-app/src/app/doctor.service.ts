import { Injectable } from '@angular/core';
import { Doctor } from 'src/models/Doctor';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  doctors: Doctor[];
  private username = "alex";
  private password = "alex"
  constructor(private http: HttpClient) {
    this.doctors = [
      new Doctor(101, "Alex", 4, true),
      new Doctor(102, "Vesi", 1, true),
      new Doctor(103, "Prova", 2, true),
      new Doctor(104, "Test", 4, false)
    ];
  }

  getAllDoctors(): Observable<Doctor[]> {
    return this.http.get<Doctor[]>("https://baas.kinvey.com/appdata/kid_ByY4kawhB/doctors", {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Basic ${btoa(`${this.username}:${this.password}`)}`
      }
    }).pipe(map(res => {
      let doctors = [];
      for(const d of res){
        doctors.push(new Doctor(d.id,d.name,d.rating,d.active));
      }
     
      return doctors;
    }));
  }
  toggleStatus(id: number) {
    let doc = this.doctors.find(d => d.id === id);
    if (doc) {
      doc.toggleStatus();
    }
  }

  remove(id: number) {
    this.doctors = this.doctors.filter(d => d.id != id);
  }

}
