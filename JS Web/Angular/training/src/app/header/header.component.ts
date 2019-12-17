import { Component, OnInit } from '@angular/core';
import {StorageService} from '../storage.service';
import {AuthService} from '../auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  logged:boolean;
  constructor(private storage:StorageService,private auth:AuthService) { }

    ngOnInit() {
	  this.logged =	this.auth.isAuth()
	}
	logout(){
		console.log("logging out");
	  this.auth.logout();
	  this.logged =	this.auth.isAuth()
	  console.log(this.logged);
	}
}
