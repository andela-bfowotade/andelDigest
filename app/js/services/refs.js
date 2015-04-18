angular.module('andelfire.services')
  .factory('Refs', ['$cookies', '$firebase',
    function($cookies, $firebase) {
      var rootRef = new Firebase($cookies.rootRef || 'https://andelf-development.firebaseio.com');     
      
      //define every standard ref used application wide
      return {
        root: rootRef,
        users: rootRef.child('users'),
        kbAs: rootRef.child('articles')
      };
    }
  ]);
