import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	username: string;
	password: string;
	showSpinner = false;
	constructor(private router:Router,private auth:AuthService) { }

	ngOnInit() {
		  
	}
	login(){
		this.showSpinner= true;
		this.auth.login(this.username,this.password);
		this.showSpinner = false;
		this.router.navigate(['/home']);
	}

}
