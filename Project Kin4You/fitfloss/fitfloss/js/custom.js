(function ($) {
  "use strict";
	

  var review = $('.client_review_iner');
  if (review.length) {
    review.owlCarousel({
      items: 3,
      loop: true,
      dots: true,
      autoplay: true,
      autoplayHoverPause: true,
      autoplayTimeout: 5000,
      nav: false,
      margin: 30,
      responsiveClass:true,
      responsive:{
          0:{
              items:1,
          },
          576:{
              items:2,
          },
          991:{
              items:3,
          }
      }
    });
  }

  // // menu fixed js code
  $(window).scroll(function () {
    var window_top = $(window).scrollTop() + 1;
    if (window_top > 50) {
      $('.main_menu').addClass('menu_fixed animated fadeInDown');
    } else {
      $('.main_menu').removeClass('menu_fixed animated fadeInDown');
    }
  });

}(jQuery));