import { Injectable } from '@angular/core';
import {StorageService} from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private storage:StorageService) { }
  
  isAuth(){
	 return this.storage.get('username') != null && typeof this.storage.get('username') !== 'undefined' && typeof this.storage.get('password') != null && typeof this.storage.get('password') !== 'undefined';
  }
  login(username:string,password:string){
	this.storage.save('username',username);
	this.storage.save('password',password);
  }
  logout(){
	  this.storage.clear();
  }
}
