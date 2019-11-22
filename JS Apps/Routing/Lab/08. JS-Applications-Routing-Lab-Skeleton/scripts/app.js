
$(() =>{
	
	const app = Sammy('#main',function(){
		
		this.use("Handlebars",'hbs');
		
		this.get('#/',function(){
			this.loggedIn = sessionStorage.getItem("authtoken") != ''; 
			console.log(this.loggedIn);
			this.username = sessionStorage.getItem("username");
			this.loadPartials({
				header : '../templates/header.hbs',
				loginForm : '../templates/loginForm.hbs',
				loginPage : '../templates/login.hbs',
				footer : '../templates/footer.hbs',
				
			}).then(function(){
				this.partial('../templates/home.hbs');
			});
			
		});
		this.get('#/furniture/create',function(){
						this.loggedIn = sessionStorage.getItem("authtoken") != ''; 

			this.loadPartials({
				header : '../templates/header.hbs',
				footer : '../templates/footer.hbs',
				
			}).then(function(){
				this.partial('../templates/addFurniture.hbs');
			});
		});
		this.post('#/login',function(context){
			
			const username = context.target['0'].value;
		    const password = context.target['1'].value;
		    auth.login(username, password)
			.then(res => {
				if(!res.ok){
					throw new Error(res.statusText);
				}
				
				return res.json();
			})
			.then(userInfo => {
				console.log(userInfo);
				auth.saveSession(userInfo);
				context.redirect("index.html#/");
			})
			.catch(err => {
				alert(err);
			});
			
		});
	});
	app.run('index.html#/');
});