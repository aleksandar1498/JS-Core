const HANDLERS = {};

$(() => {
	var app = $.sammy('#main', function () {
		
    this.use("Handlebars", 'hbs');
	
    this.get('#/home', HANDLERS.homeHandler);
    this.get("#/login", HANDLERS.loginGET);
    this.post("#/login",HANDLERS.loginPOST);
	this.get("#/logout",HANDLERS.logoutGET);
	this.get("#/about",HANDLERS.aboutGET);
	
    /*this.get("#/register", HANDLERS.registerGet);
    this.post("#/register",HANDLERS.registerPOST);*/
    

  });

 
    app.run('index.html#/home');
  

});

// AUTH HANDLERS
HANDLERS.homeHandler = function(){
	this.loggedIn = auth.isAuth();
	this.username = sessionStorage.getItem('username');
	this.loadPartials({
		header: '../templates/common/header.hbs',
        footer: '../templates/common/footer.hbs',
	}).then(function (){
		
		this.partial('../templates/home/home.hbs');
	});
}
HANDLERS.registerGet = function (){
	this.loadPartials({
		header: '../templates/common/header.hbs',
        footer: '../templates/common/footer.hbs',
		
	}).then(function (){
		this.partial('../templates/register/registerPage.hbs');
	});
}

HANDLERS.registerPOST = function (context){
	const username = context.params.username;
    const password = context.params.password;
      const repeatPassword = context.params.repeatPassword;
	  if(password !== repeatPassword){
		  alert("Passwords does not match");
		  return;
	  }
     auth.register(username,password,repeatPassword);
	 
}

HANDLERS.loginGET = function(){
	this.loadPartials({
		header: '../templates/common/header.hbs',
        footer: '../templates/common/footer.hbs',
		loginForm: '../templates/login/loginForm.hbs',
	}).then(function (){
		 this.partial('../templates/login/loginPage.hbs');
	});
	
}

HANDLERS.loginPOST = function(context){
	  const username = context.params.username;
      const password = context.params.password;
	  auth.login(username,password)
	  .then(auth.handleError)
	  .then(res => res.json())
	  .then(userInfo => {
		  auth.saveSession(userInfo);
		  this.redirect("#/home");
	  })
	  .catch(err => {
		 auth.showError(err)
	  });
}

HANDLERS.logoutGET = function(){
	let that = this;
	auth
	.logout()
	.then(function(){
		that.redirect("#/home");
	});
}

HANDLERS.aboutGET = function(){
	this.loadPartials({
		header: '../templates/common/header.hbs',
        footer: '../templates/common/footer.hbs',
	}).then(function (){
		 this.partial('../templates/about/about.hbs');
	});
}

