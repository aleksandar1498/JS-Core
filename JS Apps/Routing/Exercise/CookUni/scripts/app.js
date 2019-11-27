const HANDLERS = {};

$(()=>{
	var app = $.sammy('#rooter',function(){
		
		this.use('Handlebars','hbs');
		this.get('#/',HANDLERS.showHome);
		
		this.get('#/login',HANDLERS.loginGet);
		this.post('#/login',HANDLERS.loginPost);
		
		this.get('#/logout',HANDLERS.logout);
		
		this.get('#/register',HANDLERS.registerGet);
		this.post('#/register',HANDLERS.registerPost);
		
		this.get('#/share',HANDLERS.shareGet);
		this.post('#/share',HANDLERS.sharePost);
		
		this.get("/#details/:id",HANDLERS.mealDetailsGet);
	});
	
	app.run('index.html#/');
	
});

HANDLERS.showHome = async function(){
	let that = this;
	this.loggedIn = auth.isAuth();
	$("#loadingBox").show();
	
	let partials = {
		notification : '../templates/messages/notification.hbs',
		header : '../templates/common/header.hbs',
		mealTemplate : '../templates/meal/mealTemplate.hbs',
		mealsPage : '../templates/meal/mealsPage.hbs',
		footer : '../templates/common/footer.hbs'
	}
	//https://baas.kinvey.com/appdata/app_id/recipes
	if(this.loggedIn){
		this.meals = await requester.get('appdata','recipes','kinvey');
		this.names = sessionStorage.getItem('firstName')+" "+sessionStorage.getItem('lastName');
	
	}
		
		this.loadPartials(partials)
		.then(function(){
			this.partial('../templates/home/home.hbs');
				//$("#loadingBox").hide();
			});
}

HANDLERS.loginGet = function(){
	this.loggedIn = false;

	this.loadPartials({
				header : '../templates/common/header.hbs',
				notification : '../templates/messages/notification.hbs',
				loginForm : '../templates/login/loginForm.hbs',
				footer : '../templates/common/footer.hbs'
			}).then(function(){
				
				this.partial('../templates/login/loginPage.hbs');
				
			});
}

HANDLERS.loginPost = function(ctx){
	this.loggedIn = false;
	const username = ctx.params.username;
	const password = ctx.params.password;
	$("#loadingBox").show();
			auth
			.login(username,password)
			.then(res =>{
				
				
				if(!res.ok){
					throw new Error(res.statusText);
				}
				return res.json();
				//
				
			}).
			then(data => {
				
				auth.showInfo('Logged Successfully');
				$("#loadingBox").hide();
				sessionStorage.setItem('username',data.username);
				sessionStorage.setItem('firstName',data.firstName);
				sessionStorage.setItem('lastName',data.lastName);
				sessionStorage.setItem('authtoken',data._kmd.authtoken);
				
				this.redirect('#/');
			})
			.catch(err => {
				auth.showError(err);
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
		ctx.redirect('#/login');
	})
	.catch(err => {
		auth.showError(err);
	});
}

HANDLERS.logout = function(ctx){
	auth.logout()
	.then(function(){
		ctx.redirect('#/');
	});
}

HANDLERS.shareGet = function(){
	$("#loadingBox").show();
	this.loggedIn = auth.isAuth();
	this.names = sessionStorage.getItem('firstName')+" "+sessionStorage.getItem('lastName');
	this.loadPartials({
		header : '../templates/common/header.hbs',
		notification : '../templates/messages/notification.hbs',
		shareForm : '../templates/share/shareForm.hbs',
		footer : '../templates/common/footer.hbs'
	})
	.then(function(){
		$("#loadingBox").hide();
		this.partial('../templates/share/sharePage.hbs');
	});
}

HANDLERS.sharePost = function(ctx){
	$("#loadingBox").show();
	let recipeData = {
		meal : ctx.params.meal,
		ingredients : ctx.params.ingredients.split(' '),
		prepMethod : ctx.params.prepMethod,
		description : ctx.params.description,
		category : ctx.params.category,
		foodImageURL : ctx.params.foodImageURL,
		categoryImageURL : ctx.params.categoryImageURL,
		likesCounter : "0",
	};
	requester
	.post('appdata','recipes', 'kinvey', recipeData)
	.then(res => {
			console.log(res);
		$("#loadingBox").hide();
		if(!res.ok){
			throw new Error(res);
		}
	
		auth.showInfo('Addedd Successfully');
		ctx.redirect('#/');
	})
	.catch(err =>{
		auth.showError(err);
	});
}

HANDLERS.mealDetailsGet = function(ctx){
	console.log(ctx);
};






