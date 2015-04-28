angular.module("andelfire.filters")
 .filter('capitalize', function() {

  return function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
  }
    
 });
