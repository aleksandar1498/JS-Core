const HANDLERS = {};

$(()=>{
	var app = $.sammy('#rooter',function(){
		this.use('Handlebars','hbs');
		this.get('#/',HANDLERS.showHome);
		
		this.get('#/login',HANDLERS.loginGet);
		
		this.get('#/register',HANDLERS.registerGet);
		this.post('#/register',HANDLERS.registerPost);
	});
	
	app.run('index.html#/');
	
});

HANDLERS.showHome = function(){
	this.loggedIn = sessionStorage.getItem('userId');
	$("#loadingBox").show();
	
	this.loadPartials({
				header : '../templates/common/header.hbs',
				footer : '../templates/common/footer.hbs'
			}).then(function(){
				$("#loadingBox").hide();
				this.partial('../templates/home/home.hbs');
			});
}

HANDLERS.loginGet = function(){
	this.loggedIn = false;
	$("#loadingBox").show();
	this.loadPartials({
				header : '../templates/common/header.hbs',
				loginForm : '../templates/login/loginForm.hbs',
				footer : '../templates/common/footer.hbs'
			}).then(function(){
				auth.showInfo('Logged Successfully');
				this.partial('../templates/login/loginPage.hbs');
				$("#loadingBox").hide();
				
			});
}

HANDLERS.registerGet = function (ctx) {
	this.loggedIn = false;
	$("#loadingBox").show();
			ctx.loadPartials({
				header : '../templates/common/header.hbs',
				registerForm : '../templates/register/registerForm.hbs',
				notification : '../templates/messages/notification.hbs',
				footer : '../templates/common/footer.hbs'
			}).then(function(){
				this.partial('../templates/register/registerPage.hbs');
				$("#loadingBox").hide();
			});
	
}
HANDLERS.registerPost = function (ctx) {
	$("#loadingBox").show();
	
	const username = ctx.params['username'];
	const password =ctx.params['password'];
	const repeatPassword =ctx.params['repeatPassword'];
	const firstName =ctx.params['firstName'];
	const lastName =ctx.params['lastName'];
	if(repeatPassword != password){
		$("#loadingBox").hide();
		auth.showError("Passwords does not match");
		return;
	}
	auth.register(username, password, repeatPassword,firstName,lastName)
	.then(res => {
		$("#loadingBox").hide();
		if(!res.ok){
			throw new Error(res.statusText);
		}
		
		auth.showInfo("Registration successful!");
	})
	.catch(err => {
		auth.showError(err);
	});
	//{username,password,repeatPassword,lastName,firstName} = ctx.params;
	//console.log(username,lastName);
}