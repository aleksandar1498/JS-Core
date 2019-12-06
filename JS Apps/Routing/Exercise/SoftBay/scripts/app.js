const HANDLERS = {};

$(()=>{
	
	var app = $.sammy('#rooter',function(){
		
		this.use('Handlebars','hbs');
		
		this.get("#/",HANDLERS.homeGet);
		
		this.get("#/login",HANDLERS.loginGet);
		this.post("#/login",HANDLERS.loginPost);
		
		this.get("#/register",HANDLERS.registerGet);
		this.post("#/register",HANDLERS.registerPost);
		
		this.get("#/logout",HANDLERS.logoutGet);
		
		this.get("#/dashboard",HANDLERS.dashboardGet);
		
		this.get("#/create",HANDLERS.createGet);
		this.post("#/create",HANDLERS.createPost);
		
		this.get("#/edit/:id",HANDLERS.editGet);
		this.post("#/edit/:id",HANDLERS.editPost);
		
		this.get("#/delete/:id",HANDLERS.deleteGet);
		this.post("#/delete/:id",HANDLERS.deleteRequest);
	});
	app.run();
	
});
HANDLERS.homeGet= function(){
		
			this.loggedIn = auth.isAuth();
			this.loadPartials({
				header : '../templates/common/header.hbs',
				footer : '../templates/common/footer.hbs'
			}).then(function(){
				this.partial('../templates/home/home.hbs');
			});
};

HANDLERS.registerGet = function(){
			this.loggedIn = false;
			this.loadPartials({
				header : '../templates/common/header.hbs',
				footer : '../templates/common/footer.hbs'
			}).then(function(){
				this.partial('../templates/auth/registerPage.hbs');
			});
}

HANDLERS.registerPost = function(ctx){
	let username = ctx.params.username;
	let password = ctx.params.password;
	let rePassword = ctx.params.rePassword;
	if(password != rePassword){
		notify.showError("The provided passwords are different");
		return;
	}
	notify.loadingBox.show();
	auth
	.register(username,password)
	.then(res => {
		notify.loadingBox.hide();
		if(!res.ok){
			throw new Error(res.statusText);
		}
		notify.showInfo("Registered");
		ctx.redirect('#/login');
	})
	.catch(err =>{
		notify.showError(err);
	});
	console.log(username,password);
}

HANDLERS.loginGet = function(){
			this.loggedIn = false;
			this.loadPartials({
				header : '../templates/common/header.hbs',
				footer : '../templates/common/footer.hbs'
			}).then(function(){
				this.partial('../templates/auth/loginPage.hbs');
			});
}

HANDLERS.loginPost = function(ctx){
	let username = ctx.params.username;
	let password = ctx.params.password;
	notify.loadingBox.show();
	auth
	.login(username,password)
	.then(res =>{
		notify.loadingBox.hide();
		if(!res.ok){
			throw new Error(res.statusText);
		}
		notify.showInfo("Logged");
		return res.json();
	})
	.then(data => {
		storage.saveUser(data);
		this.redirect('#/');
	})
	.catch(err =>{
		notify.showError(err);
	});
}

HANDLERS.logoutGet = function(){
	notify.loadingBox.show();
	auth
	.logout()
	.then(res =>{
		notify.loadingBox.hide();
		if(res['error']){
			throw new Error(res.description);
		}
		notify.showInfo("Logged out");
		storage.removeUser();
		this.redirect('#/');
	})
	.catch(err =>{
		notify.showError(err);
	});
	
}

HANDLERS.dashboardGet =async function(){
	this.loggedIn = auth.isAuth();
	this.offers = await requester.get('appdata','offers','kinvey');
	this.offers.map(offer => {
		offer.isAuthor = storage.getData('userId') == offer._acl.creator;
	});
	this.hasOffers = this.offers.length > 0;
	
	this.loadPartials({
				header : '../templates/common/header.hbs',
				footer : '../templates/common/footer.hbs'
			}).then(function(){
				this.partial('../templates/home/dashboard.hbs');
			});
}

HANDLERS.createGet = function(){
	this.loggedIn = auth.isAuth();
	this.loadPartials({
				header : '../templates/common/header.hbs',
				footer : '../templates/common/footer.hbs'
			}).then(function(){
				this.partial('../templates/offer/createOffer.hbs');
			});
}

HANDLERS.createPost = function(ctx){
	notify.loadingBox.show();
	let product = ctx.params.product;
	let description = ctx.params.description;
	let price = ctx.params.price;
	let pictureURL = ctx.params.pictureURL;
	let data ={
		product,
		description,
		price,
		pictureURL
	}
	requester
	.post('appdata','offers','kinvey',data)
	.then(res =>{
		notify.loadingBox.hide();
		if(!res.ok){
			throw new Error(res.statusText);
		}
		notify.showInfo("Created");
		this.redirect('#/dashboard');
	})
	.catch(err =>{
		notify.showError(err);
	});
	
	
}

HANDLERS.editGet =async function(ctx){
	this.loggedIn = auth.isAuth();
	this.offer = await requester.get('appdata','offers/'+ctx.params.id,'kinvey');
	this.loadPartials({
				header : '../templates/common/header.hbs',
				footer : '../templates/common/footer.hbs'
			}).then(function(){
				this.partial('../templates/offer/editOffer.hbs');
			});
}

HANDLERS.editPost = function(ctx){
	notify.loadingBox.show();
	let product = ctx.params.product;
	let description = ctx.params.description;
	let price = ctx.params.price;
	let pictureURL = ctx.params.pictureURL;
	let data ={
		product,
		description,
		price,
		pictureURL
	}
	
	requester
	.update('appdata','offers/'+ctx.params.id,'kinvey',data)
	.then(res =>{
		notify.loadingBox.hide();
		if(!res.ok){
			throw new Error(res.statusText);
		}
		notify.showInfo("UPDATED");
		ctx.redirect('#/dashboard');
	})
	.catch(err =>{
		notify.showError(err);
	});
}

HANDLERS.deleteGet =async function(ctx){
	this.loggedIn = auth.isAuth();
	this.offer = await requester.get('appdata','offers/'+ctx.params.id,'kinvey');
	this.loadPartials({
				header : '../templates/common/header.hbs',
				footer : '../templates/common/footer.hbs'
			}).then(function(){
				this.partial('../templates/offer/deleteOffer.hbs');
			});
}

HANDLERS.deleteRequest = function(ctx){
	notify.loadingBox.show();
	let id = ctx.params.id;
	requester
	.remove('appdata','offers/'+id,'kinvey')
	.then(res =>{
		notify.loadingBox.hide();
		if(!res.ok){
			throw new Error(res.statusText);
		}
		notify.showInfo("DELETED");
		ctx.redirect('#/dashboard');
	})
	.catch(err =>{
		notify.showError(err);
	});
	
	
}