import { Component, OnInit } from '@angular/core';
import {StorageService} from '../storage.service';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  logged:boolean;
  constructor(private storage:StorageService,private auth:AuthService,private router:Router) { }

    ngOnInit() {
	  this.logged =	this.auth.isAuth()
	}
	logout(){
		console.log("logging out");
	  this.auth.logout();
	  console.log(this.logged);
	  this.logged =	this.auth.isAuth()
	  this.router.navigate(['/home']);
	}
}
