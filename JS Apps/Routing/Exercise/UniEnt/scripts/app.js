import {register,login,logout} from './auth.js';
import {showError,showInfo} from './messageHandler.js';
const HANDLERS = {};
$(() => {
	const app = $.sammy("#root",function(){
		this.use("Handlebars","hbs");
		
		this.get('index.html#/',HANDLERS.showHome);
		
		this.get('#/register',HANDLERS.registerGet);
		this.post('#/register',HANDLERS.registerPost);
		
		this.get('#/login',HANDLERS.loginGet);	
		this.post('#/login',HANDLERS.loginPost);	
	});
	app.run("index.html#/");
});

function getPartials(){
	return {
		'header' : '../templates/common/header.hbs',
		'footer' : '../templates/common/footer.hbs'
	}
}
HANDLERS.showHome = function(){
	this.loggedIn = storage.isAuth();
	let partials = getPartials();
	partials['guestHome'] = '../templates/home/guestHome.hbs';
	partials['eventDetails'] = '../templates/home/eventDetails.hbs';
	partials['noEvent'] = '../templates/home/noEvent.hbs';
	this.loadPartials(partials)
	.partial('../templates/home/home.hbs');
}
HANDLERS.registerGet = function(){
	let partials = getPartials();
	partials['registerForm'] = '../templates/auth/registerForm.hbs';
	
	this
	.loadPartials(partials)
	.then(function(){
		this.partial('../templates/auth/registerPage.hbs');
	});
	
}

HANDLERS.registerPost = function(ctx){
let errors = [];
let username = ctx.params.username;
let password = ctx.params.password;
let rePassword = ctx.params.rePassword;

	if(username.length < 3){
		errors.push("<p>Username should be at least 3 characters</p>");
	}
	if(password.length < 6){
		errors.push("<p>Password should be at least 6 characters</p>");
	}
	if(password != rePassword){
		errors.push("<p>Passwords do not correspond</p>");
	}
	
	if(errors.length > 0){
		showError(errors);
		return;
	}
	
	register(username,password)
	.then(res => {
		if(!res.ok){
            throw new Error(res.statusText);
        }
		showInfo("Registered Successfully");
		ctx.redirect('#/login');
	})
	.catch(err => {
		showError(err);
	});
	
}

HANDLERS.loginGet = function(){
	
	let partials = getPartials();
	partials['loginForm'] = '../templates/auth/loginForm.hbs';
	
	this
	.loadPartials(partials)
	.then(function(){
		this.partial('../templates/auth/loginPage.hbs');
	});
	
}

HANDLERS.loginPost = function(ctx){
	const username = ctx.params.username;
	const password = ctx.params.password;
	login(username,password)
	.then(res =>{
		if(!res.ok){
            throw new Error(res.statusText);
        }
		showInfo("Logged Successfully");
		
		
		return res.json();
	})
	.then(data =>{
		sessionStorage.setItem("username",data.username);
		sessionStorage.setItem("userId",data._id);
		sessionStorage.setItem("authtoken",data._kmd.authtoken);
		ctx.redirect('#/');
	})
	.catch(err =>{
		showError(err);
	});
	
}
