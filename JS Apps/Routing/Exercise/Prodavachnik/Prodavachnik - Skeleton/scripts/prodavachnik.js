const HANDLERS = {};
$(() => {
	attachEvents();
	const app = $.sammy('#router-outlet',function(){
		this.use('Handlebars','hbs');
		
		this.get('#/',HANDLERS.home);
		
		this.get('#/login',HANDLERS.loginGet);
		this.post('#/login',HANDLERS.loginPost);
		
		this.get('#/register',HANDLERS.registerGet);
	});
	
	app.run();

});

HANDLERS.home = function(){
			this.loggedIn = false;
			this.loadPartials({
				'header':'../templates/common/header.hbs',
				'anonymousHome': '../templates/home/anonymousHome.hbs',
				'footer':'../templates/common/footer.hbs'
			}).then(function(){
				this.partial('../templates/home/home.hbs');
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
		
function attachEvents(){
	$("#buttonLoginUser").on('click',function(){
		console.log("clicked");
	});
}
		
		