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
		
		this.get("#/delete/:id",HANDLERS.removeGet);
		
		this.get("#/edit/:id",HANDLERS.editGet);
		this.post("#/edit/:id",HANDLERS.editPost);
		
		this.get('#/details/:id',HANDLERS.adsDetailsGet);
		
		this.get('#/like/:id',HANDLERS.adsLike);
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
	loadingBox.show();
			this.loggedIn = storage.isAuth();
			this.ads = await requester.get("appdata","store",'kinvey');
			this.ads.map(x => {
				x.isAuthor = x.publisher == storage.getData("userId");
			});
			this.hasAds = this.ads.length > 0;
			this.loadPartials({
				'header':'../templates/common/header.hbs',
				'footer':'../templates/common/footer.hbs'
			}).then(function(){
				loadingBox.hide();
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
	adward['likes'] = 0;
	requester
	.post('appdata','store','kinvey',adward)
	.then(res =>{
		loadingBox.hide();
		if(!res.ok){
			throw new Error(res.statusText);
		}
		showInfo("Created");
		ctx.redirect('#/ads');
	}).catch(err => {
		showError(err);
	});
}

HANDLERS.removeGet = function(ctx){
	let id = ctx.params.id;
	
	loadingBox.show();
	
	requester
	.remove('appdata','store/'+id,'kinvey')
	.then(res => {
		loadingBox.hide();
		if(!res.count){
			throw new Error("Unable to remove");
		}
		showInfo("Deleted");
		ctx.redirect('#/ads');
	})
	.catch(err => {
		showError(err);
	});
}

HANDLERS.editGet = async function(ctx){
	loadingBox.show();
	let id = ctx.params.id;
	this.adward =await requester.get("appdata","store/"+id,'kinvey');
	console.log(this.adward);
	this.loggedIn = storage.isAuth();
	
	this.loadPartials({
				'header':'../templates/common/header.hbs',
				'footer':'../templates/common/footer.hbs'
	}).then(function(){
		loadingBox.hide();
		this.partial('../templates/ads/editAds.hbs');
	});
 }
 
 HANDLERS.editPost = function(ctx){
	let adward = ctx.params;
			
	requester
	.update('appdata','store/'+adward.id,'kinvey',adward)
	.then(res =>{
		loadingBox.hide();
		console.log(res);
		if(!res.ok){
			throw new Error(res.statusText);
		}
		showInfo("Updated");
		ctx.redirect('#/ads');
	}).catch(err => {
		
		showError(err);
	});
	
 }
	

HANDLERS.adsDetailsGet =async function(ctx){
	this.adward = await requester.get('appdata','store/'+ctx.params.id,'kinvey');
	this.isClient = this.adward.publisher != storage.getData('userId');
	this.loggedIn = storage.isAuth();
	this.loadPartials({
				'header':'../templates/common/header.hbs',
				'adsDetails': '../templates/ads/adsDetails.hbs',
				'footer':'../templates/common/footer.hbs'
	}).then(function(){
		this.partial('../templates/ads/adsDetailsPage.hbs');
	});
}

HANDLERS.adsLike =async function(ctx){
	adward = await requester.get('appdata','store/'+ctx.params.id,'kinvey');
	adward.likes = +adward.likes+1;
	requester
	.update('appdata','store/'+adward.id,'kinvey',adward)
	.then(res =>{
		loadingBox.hide();
		console.log(res);
		if(!res.ok){
			throw new Error(res.statusText);
		}
		showInfo("Liked");
		ctx.redirect('#/details/'+adward.id);
	}).catch(err => {
		
		showError(err);
	});
}
		
		