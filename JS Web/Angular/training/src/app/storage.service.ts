import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }
  
  save(key:string,data:string){
	localStorage.setItem(key,data);  
  }
  
  get(key:string){
	 return localStorage.getItem(key); 
  }
  
  clear(){
	  localStorage.clear();
  }
  
}
