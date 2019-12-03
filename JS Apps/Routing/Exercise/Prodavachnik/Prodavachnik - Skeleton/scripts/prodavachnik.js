const HANDLERS = {};
$(() => {
	
	const app = $.sammy('#router-outlet',function(){
		this.use('Handlebars','hbs');
		
		this.get('#/',HANDLERS.home);
		
		this.get('#/ads',HANDLERS.listAdsGet);
		
		this.get('#/login',HANDLERS.loginGet);
		this.post('#/login',HANDLERS.loginPost);
		
		this.get('#/logout',HANDLERS.logout);
		
		this.get('#/register',HANDLERS.registerGet);
		
		this.get("#/create",HANDLERS.createGet);
		this.post("#/create",HANDLERS.createPost);
	});
	
	app.run();

});

HANDLERS.home = function(){
			this.loggedIn = storage.isAuth();
			
			this.loadPartials({
				'header':'../templates/common/header.hbs',
				'anonymousHome': '../templates/home/anonymousHome.hbs',
				'footer':'../templates/common/footer.hbs'
			}).then(function(){
				this.partial('../templates/home/home.hbs');
			});
		}
		
HANDLERS.listAdsGet =async function(){
			this.loggedIn = storage.isAuth();
			this.ads = await requester.get("appdata","store",'kinvey');
			this.hasAds = this.ads.length > 0;
			console.log(this.hasAds);
			console.log(this.ads);
			this.loadPartials({
				'header':'../templates/common/header.hbs',
				'footer':'../templates/common/footer.hbs'
			}).then(function(){
				this.partial('../templates/ads/viewAds.hbs');
			});
		}
		
HANDLERS.loginGet = function(){
			this.loggedIn = false;
			this.loadPartials({
				'header':'../templates/common/header.hbs',
				'footer':'../templates/common/footer.hbs'
			}).then(function(){
				this.partial('../templates/auth/login.hbs');
			});
		}
HANDLERS.loginPost = function(ctx){
	loadingBox.show();
			let username = ctx.params['username'];
			let password = ctx.params['passwd'];
			login(username,password)
			.then(res =>{
				loadingBox.hide();
				if(!res.ok){
					throw new Error(res.statusText);
				}
				
				showInfo("Valid Credentials");
				return res.json();
			})
			.then(data => {
				console.log(data);
				storage.saveUser(data);
				ctx.redirect('#/');
			})
			.catch(err =>{
				showError(err);
			});
			
}

HANDLERS.logout = function(ctx){
	loadingBox.show();
	logout()
	.then(res =>{
		loadingBox.hide();
		if(!res.ok){
			throw new Error(res.statusText);
		}
		
		showInfo("Logged out");
		storage.removeUser();
		ctx.redirect('#/login');
	})
	.catch(err => {
		showError(err);
	});
}
HANDLERS.registerGet = function(){
			this.loggedIn = false;
			this.loadPartials({
				'header':'../templates/common/header.hbs',
				'footer':'../templates/common/footer.hbs'
			}).then(function(){
				this.partial('../templates/auth/register.hbs');
			});
		}		
HANDLERS.registerPost= function(){
			console.log("POST");
		}
HANDLERS.createGet= function(){
	this.loggedIn = storage.isAuth();
	this.loadPartials({
				'header':'../templates/common/header.hbs',
				'adsForm': '../templates/ads/createAdsForm.hbs',
				'footer':'../templates/common/footer.hbs'
			}).then(function(){
				this.partial('../templates/ads/createAdsPage.hbs');
			});
		}
HANDLERS.createPost= function(ctx){
	loadingBox.show();
	let adward = ctx.params;
	adward['publisher'] = storage.getData("userId");
	adward['datePublishing'] = Date(Date.now());
	requester
	.post('appdata','store','kinvey',adward)
	.then(res =>{
		loadingBox.hide();
		if(!res.ok){
			throw new Error(res.statusText);
		}
		showInfo("Created");
		ctx.redirect('#/');
	}).catch(err => {
		showError(err);
	});
}

		
		