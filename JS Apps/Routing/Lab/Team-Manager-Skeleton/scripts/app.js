const HANDLERS = {};

$(() => {
	var app = $.sammy('#main', function () {
		
    this.use("Handlebars", 'hbs');
	
    this.get('#/home', HANDLERS.homeHandler);
	this.get("#/register", HANDLERS.registerGet);
    this.post("#/register",HANDLERS.registerPOST);
    this.get("#/login", HANDLERS.loginGET);
    this.post("#/login",HANDLERS.loginPOST);
	this.get("#/logout",HANDLERS.logoutGET);
	this.get("#/about",HANDLERS.aboutGET);
	this.get("#/catalog",HANDLERS.catalogGET);
    this.get("#/create",HANDLERS.createTeamGet);
    this.post("#/create",HANDLERS.createTeamPost);
	
	this.get("#/edit/:id",HANDLERS.editTeamGet);
	this.post("#/edit/:id",HANDLERS.editTeamPost);
	
	this.get("#/catalog/:id",HANDLERS.teamDetailsGet);
	this.get("#/join/:teamId",HANDLERS.joinTeamGet);
	this.get("#/leave",HANDLERS.leaveTeamGet);
  });

 
    app.run('index.html#/home');
  

});

// AUTH HANDLERS
HANDLERS.homeHandler = function(){
	this.loggedIn = auth.isAuth();
	this.hasTeam = sessionStorage.getItem('teamId') != 'undefined' && sessionStorage.getItem('teamId') != null;
	this.teamId = sessionStorage.getItem('teamId');
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
		registerForm : '../templates/register/registerForm.hbs',
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

HANDLERS.aboutGET = function(ctx){
	if(!auth.isAuth()){
		context.redirect('#/home');
	}
	ctx.loggedIn = auth.isAuth();
	ctx.username = sessionStorage.getItem('username');
	ctx.loadPartials({
		header: '../templates/common/header.hbs',
        footer: '../templates/common/footer.hbs',
	}).then(function (){
		 this.partial('../templates/about/about.hbs');
	});
}

HANDLERS.catalogGET = function(context){
	
	if(!auth.isAuth()){
		context.redirect('#/home');
	}
		teamsService
		.loadTeams()
		.then(function(data){
			context.loggedIn = auth.isAuth();
			context.username = sessionStorage.getItem('username');
			context.hasNoTeam = sessionStorage.getItem('teamId') === null || sessionStorage.getItem('teamId') === "undefined";
			context.teams = data.slice(data.length-15,data.length);
			context.loadPartials({
                        header: './templates/common/header.hbs',
						team: './templates/catalog/team.hbs',
						footer: './templates/common/footer.hbs',
                    }).then(function () {
                        this.partial('./templates/catalog/teamCatalog.hbs');
                    });
		});
	
		
		
		//this.partial('../templates/about/about.hbs');
	
}
HANDLERS.createTeamGet = function(){
	if(!auth.isAuth()){
		context.redirect('#/home');
	}
	this.loadPartials({
		header: '../templates/common/header.hbs',
		createForm: '../templates/create/createForm.hbs',
        footer: '../templates/common/footer.hbs',
	}).then(function(){
		 this.partial('./templates/create/createPage.hbs');
	});
}

HANDLERS.createTeamPost = function(context){
	
	const name = context.params.name;
	const comment = context.params.comment;
	teamsService
	.createTeam(name, comment)
	.then(success => {
		context.redirect('#/catalog')
	})
	.catch(err => {
			console.log(err);
	});
}
HANDLERS.editTeamGet = function(ctx){
	if(!auth.isAuth()){
		context.redirect('#/home');
	}
	const id = ctx.params.id;
	teamsService
		.loadTeamDetails(id.slice(1))
		.then(res => {
			console.log(res);
			ctx.teamId = res._id;
			ctx.name = res.name;
			ctx.comment = res.comment;
			ctx.loadPartials({
				header: '../templates/common/header.hbs',
				editForm: '../templates/edit/editForm.hbs',
				footer: '../templates/common/footer.hbs',
			})
			.then(function(){
				this.partial('../templates/edit/editPage.hbs');
			})
			.catch(err => {
				console.log(err);
			});
		});
	
}

HANDLERS.editTeamPost = function(ctx){
	teamsService
		.edit(ctx.params.id.slice(1),ctx.params.name,ctx.params.comment)
		.then(success => {
			ctx.redirect(`#/catalog/${ctx.params.id}`);
		})
		.catch(err => {
			console.log(err);
		});
	
}

HANDLERS.teamDetailsGet = function(ctx){
	if(!auth.isAuth()){
		context.redirect('#/home');
	}
	const id = ctx.params.id;
	ctx.teamId = ctx.params.id.slice(1);
	
	teamsService
			.loadTeamDetails(id.slice(1))
			.then(res => {
			ctx.name = res.name;
			ctx.comment = res.comment;
			ctx.loggedIn = auth.isAuth();
			ctx.isAuthor = sessionStorage.getItem('userId') == res._acl.creator;
			ctx.isOnTeam =  sessionStorage.getItem('teamId') != 'undefined' && sessionStorage.getItem('teamId') != null && sessionStorage.getItem('teamId') == ctx.teamId;
			ctx.loadPartials({
				header: '../templates/common/header.hbs',
				teamMember: '../templates/catalog/teamMember.hbs',
				teamControls: '../templates/catalog/teamControls.hbs',
				footer: '../templates/common/footer.hbs',
		})
		.then(function(){
			 this.partial('./templates/catalog/details.hbs');
		})})
		.catch(err => {
			console.log(err);
		});
	

	}
	


HANDLERS.joinTeamGet = function(ctx){
	let teamId = ctx.params.teamId.slice(1);
	teamsService
	.joinTeam(teamId)
	.then(success => {
		
		ctx.redirect('#/catalog/:'+teamId);
	})
	.catch(err => {
		console.log(err);
	});
}

HANDLERS.leaveTeamGet = function(ctx){
	const currentTeamId = sessionStorage.getItem('teamId');
	teamsService
	.leaveTeam()
	.then(success => {
		ctx.redirect('#/catalog/:'+currentTeamId);
	})
	.catch(err => {
		console.log(err);
	});
}

