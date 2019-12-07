const HANDLERS = {};

$(() => {

	var app = $.sammy('#router-outlet', function () {

		this.use('Handlebars', 'hbs');

		this.get("#/", HANDLERS.homeGet);

		this.get("#/login", HANDLERS.loginGet);
		this.post("#/login", HANDLERS.loginPost);

		this.get("#/register", HANDLERS.registerGet);
		this.post("#/register", HANDLERS.registerPost);

		this.get("#/logout", HANDLERS.logoutGet);

		this.get("#/create", HANDLERS.createGet);
		this.post("#/create", HANDLERS.createPost);

		this.get("#/details/:id", HANDLERS.detailsGet);

		this.get("#/edit/:id",HANDLERS.editGet);
		this.post("#/edit/:id",HANDLERS.editPost);
		
		this.get("#/delete/:id",HANDLERS.deleteRequest);

		this.get("#/like/:id",HANDLERS.likeGet);

		this.get("#/profile",HANDLERS.showProfile);
	
	});
	app.run();

});
HANDLERS.homeGet = async function () {
	this.loggedIn = auth.isAuth();
	notify.loadingBox.show();
	if(this.loggedIn){
		this.treks = await requester.get('appdata', 'treks', 'kinvey');
		this.treks.sort((a,b) => {
			return b.likes - a.likes;
		});
		this.hasTreks = this.treks.length > 0;
		this.username = storage.getData('username');
	}
	
	
	this.loadPartials({
		header: '../templates/common/header.hbs',
		anonymousHome: '../templates/home/anonymousHome.hbs',
		footer: '../templates/common/footer.hbs'
	}).then(function () {
		notify.loadingBox.hide();
		this.partial('../templates/home/home.hbs');
	});
};

HANDLERS.detailsGet = async function (ctx) {
	notify.loadingBox.show();
	this.username = storage.getData('username');
	this.loggedIn = auth.isAuth();
	
	let trekId = ctx.params.id;
	this.trek = await requester.get('appdata', 'treks/' + trekId, 'kinvey');
	this.isAuthor = this.trek._acl.creator == storage.getData('userId');
	this.loadPartials({
		header: '../templates/common/header.hbs',
		footer: '../templates/common/footer.hbs'
	}).then(function () {
		notify.loadingBox.hide();
		this.partial('../templates/trek/detailsTrek.hbs');
		
	});
}

HANDLERS.registerGet = function () {
	this.loggedIn = false;

	this.loadPartials({
		header: '../templates/common/header.hbs',
		footer: '../templates/common/footer.hbs'
	}).then(function () {
		this.partial('../templates/auth/registerPage.hbs');
	});
}

HANDLERS.registerPost = function (ctx) {
	let username = ctx.params.username;
	let password = ctx.params.password;
	let rePassword = ctx.params.rePassword;
	let errors = [];
	if (username.length < 3) {
		errors.push("The username must be at least 3 chars.");
	}
	if (password.length < 6) {
		errors.push("The password must be at least 6 chars.");
	}
	if (password != rePassword) {
		errors.push("The provided passwords are different");
	}
	if(errors.length > 0){
		notify.showError(errors);
		return;
	}
	notify.loadingBox.show();
	auth
		.register(username, password)
		.then(res => {
			notify.loadingBox.hide();
			if (!res.ok) {
				throw new Error(res.statusText);
			}
			notify.showInfo("Registered");
			ctx.redirect('#/login');
		})
		.catch(err => {
			notify.showError(err);
		});
	console.log(username, password);
}

HANDLERS.loginGet = function () {
	this.loggedIn = false;
	this.loadPartials({
		header: '../templates/common/header.hbs',
		footer: '../templates/common/footer.hbs'
	}).then(function () {
		this.partial('../templates/auth/loginPage.hbs');
	});
}

HANDLERS.loginPost = function (ctx) {
	let username = ctx.params.username;
	let password = ctx.params.password;
	notify.loadingBox.show();
	auth
		.login(username, password)
		.then(res => {
			notify.loadingBox.hide();
			if (!res.ok) {
				throw new Error(res.statusText);
			}
			notify.showInfo("Logged");
			return res.json();
		})
		.then(data => {
			storage.saveUser(data);
			this.redirect('#/');
		})
		.catch(err => {
			notify.showError("Credentials are invalid");
		});
}

HANDLERS.logoutGet = function () {
	notify.loadingBox.show();
	auth
		.logout()
		.then(res => {
			notify.loadingBox.hide();
			if (res['error']) {
				throw new Error(res.description);
			}
			notify.showInfo("Logged out");
			storage.removeUser();
			this.redirect('#/');
		})
		.catch(err => {
			notify.showError(err);
		});

}


HANDLERS.createGet = function () {
	this.loggedIn = auth.isAuth();
	this.username = storage.getData('username');
	this.loadPartials({
		header: '../templates/common/header.hbs',
		footer: '../templates/common/footer.hbs'
	}).then(function () {
		this.partial('../templates/trek/createTrek.hbs');
	});
}

HANDLERS.createPost = function (ctx) {
	notify.loadingBox.show();
	let location = ctx.params.location;

	let description = ctx.params.description;

	let errors = [];
	if (location.length < 3) {
		errors.push("Location must be at least 6 chars.");
	}
	if (description.length < 10) {
		errors.push("Description must be at least 10 chars.");
	}

	if(errors.length > 0){
		notify.loadingBox.hide();
		notify.showError(errors);
		
		return;
	}
	let dateTime = ctx.params.dateTime;
	let imageURL = ctx.params.imageURL;
	let likes = 0;
	let organizer = storage.getData('username')
	let data = {
		location,
		dateTime,
		description,
		imageURL,
		likes,
		organizer
	}
	requester
		.post('appdata', 'treks', 'kinvey', data)
		.then(res => {
			notify.loadingBox.hide();
			if (!res.ok) {
				throw new Error(res.statusText);
			}
			notify.showInfo("Trek created successfully");
			$("input[name='dateTime']").val('');
			$("input[name='location']").val('');
			$("textarea[name='description']").val('');
			$("input[name='imageURL']").val('');
		})
		.catch(err => {
			notify.showError("Invalid input.");
		});


}

HANDLERS.editGet = async function (ctx) {
	notify.loadingBox.show();
	this.loggedIn = auth.isAuth();
	this.username = storage.getData('username');
	this.trek = await requester.get('appdata', 'treks/' + ctx.params.id, 'kinvey');
	this.loadPartials({
		header: '../templates/common/header.hbs',
		footer: '../templates/common/footer.hbs'
	}).then(function () {
		notify.loadingBox.hide();
		this.partial('../templates/trek/editTrek.hbs');
	});
}

HANDLERS.editPost = function (ctx) {
	notify.loadingBox.show();
	let location = ctx.params.location;
	let dateTime = ctx.params.dateTime;
	let description = ctx.params.description;
	let imageURL = ctx.params.imageURL;
	let likes = 0;
	let organizer = storage.getData('username')
	let data = {
		location,
		dateTime,
		description,
		imageURL,
		likes,
		organizer
	}

	requester
		.update('appdata', 'treks/' + ctx.params.id, 'kinvey', data)
		.then(res => {
			notify.loadingBox.hide();
			if (!res.ok) {
				throw new Error(res.statusText);
			}
			notify.showInfo("Trek edited successfully");
			ctx.redirect('#/');
		})
		.catch(err => {
			notify.showError(err);
		});
}

HANDLERS.deleteRequest = function (ctx) {
	notify.loadingBox.show();
	let id = ctx.params.id;
	requester
		.remove('appdata', 'treks/' + id, 'kinvey')
		.then(res => {
			notify.loadingBox.hide();
			if (!res.ok) {
				throw new Error(res.statusText);
			}
			notify.showInfo("You closed the trek successfully.");
			ctx.redirect('#/');
		})
		.catch(err => {
			notify.showError(err);
		});
}

HANDLERS.likeGet = async function (ctx) {
	notify.loadingBox.show();
	let id = ctx.params.id;
	this.loggedIn = auth.isAuth();
	let trek = await requester.get('appdata', 'treks/' + ctx.params.id, 'kinvey');
	trek.likes = trek.likes + 1;
	requester
		.update('appdata', 'treks/' +id, 'kinvey', trek)
		.then(res => {
			notify.loadingBox.hide();
			if (!res.ok) {
				throw new Error(res.statusText);
			}
			notify.showInfo("You liked the trek successfully.");
			ctx.redirect('#/details/'+id);
		})
		.catch(err => {
			notify.showError(err);
		});
}

HANDLERS.showProfile =async function(){
	notify.loadingBox.show();
	this.loggedIn = auth.isAuth();
	this.username = storage.getData('username');
	this.treks = await requester.get('appdata', 'treks', 'kinvey');
	this.treks = this.treks.filter(tr => {
		return tr._acl.creator == storage.getData('userId');
	});
	this.countWished = this.treks.length;
	this.loadPartials({
		header: '../templates/common/header.hbs',
		footer: '../templates/common/footer.hbs'
	}).then(function () {
		notify.loadingBox.hide();
		this.partial('../templates/profile/profilePage.hbs');
	});
}

