$(document).ready(function() {

  $('.collapsible').collapsible({
    accordion: false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
  });
  $(".button-collapse").sideNav();
  $('.tooltipped').tooltip({
    delay: 50
  });
  $('.parallax').parallax();

  $('.scrollspy').scrollSpy();
});
