(function ($) {
  // load login template
  fetch('../templates/login/loginForm.hbs')
  .then(res => res.text())
  .then(data =>  Handlebars.registerPartial('loginForm',data));
// load register template
  fetch('../templates/register/registerForm.hbs')
  .then(res => res.text())
  .then(data =>  Handlebars.registerPartial('registerForm',data));

  Handlebars.registerPartial('header', '{{username}} {{loggedIn}}');
  Handlebars.registerPartial('footer', '{{username}} {{loggedIn}}');
 


  var app = $.sammy('#main', function () {
    this.use("Handlebars", 'hbs')
    this.get('#/home', function (context) {
      
      this.partial('../templates/home/home.hbs');
    });
    this.get("#/login", function () {
     
      this.partial('../templates/login/loginPage.hbs');
    });
    this.post("#/login",function({params}){
      const username = params.username;
      const password = params.password;
      console.log(username,password);
    });
    this.get("#/register", function () {
     
      this.partial('../templates/register/registerPage.hbs');
    });
    this.post("#/register",function(context){
      const username = context.params.username;
      const password = context.params.password;
      const repeatPassword = context.params.repeatPassword;
      auth
      .register(username,password,repeatPassword)
      .then(auth.handleError)
      .then(success => function() {
        console.log("success");
        auth.showInfo();
        context.redirect("#/login");
        
      })
      .catch(err => {
        console.log(err)
        auth.showError("A user with this Username already exists/ check password if are same");
      });
     
      
    });
    

  });

  $(function () {
    app.run('#/home');
  });

})(jQuery);