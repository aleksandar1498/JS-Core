(function($) {
      
        var app = $.sammy('#main', function() {
      
          this.get('#prova', function(context) {
           this.swap('<h1>prova</h1>'); 
          });
		  this.get('#scusa', function(context) {
           this.swap('<h1>scusa</h1>'); 
          });
      
        });
      
        $(function() {
          app.run('/#prova');
        });
      
})(jQuery);