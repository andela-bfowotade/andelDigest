/* define our modules */
angular.module('andelfire.services', ['firebase', 'ngCookies']);
angular.module('andelfire.filters', []);
angular.module('andelfire.directives', ['monospaced.elastic']);
angular.module('andelfire.controllers', []);

/* load services */
require('./js/services/authentication.js');
require('./js/services/refs.js');
require('./js/services/toast.js');
require('./js/services/users.js');

/* load filters */
require('./js/filters/reverse.js');

/* load directives */

/* load controllers */
require('./js/controllers/home.js');
require('./js/controllers/login.js');
require('./js/controllers/menu.js');
require('./js/controllers/users.js');

window.AndelFire = angular.module("AndelFire", [
  'ui.router',
  'andelfire.controllers',
  'andelfire.directives',
  'andelfire.filters',
  'andelfire.services',
  'ngAnimate',
  'ngMaterial'
]);

AndelFire.run(['$rootScope', '$state', 'Authentication', 'Refs', 'Toast', '$location',
  function($rootScope, $state, Authentication, Refs, Toast, $location) {
    $rootScope._ = window._;
    $rootScope.moment = window.moment;
    $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams, error) {
      var states = (toState.name !== 'about' && toState.name !== 'landingPage' && toState.name !== 'questions' && toState.name !== 'public_questions' && toState.name !== 'error_404');
        console.log(toState.name);
      if (!Refs.root.getAuth() && states && !$location.search().token) {
        event.preventDefault();
        $state.go('error_404');
      }
    });

    $rootScope.authCallback = function(authData) {
      Authentication.auth(authData, function(user) {
        if (user) {
          Toast('Welcome, ' + user.name + '!');
        } else {
          // logged out
          Authentication.logout();
          $state.go('landingPage');
        }
      });
    };

    Refs.root.onAuth($rootScope.authCallback);
    console.log('over here');
  }
]);

/* application routes */
AndelFire.config(['$stateProvider', '$locationProvider',
  function($stateProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $stateProvider
      .state('landingPage', {
        url: '/',
        templateUrl: 'views/landingpage.html',
        controller: 'MainCtrl'
      })
      .state('logout', {
        url: '/logout',
        controller: ['Authentication', function(Authentication) {
          Authentication.logout();
        }]
      })
      .state('default', {
        url: '/home',
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl'
      })
      .state('users', {
        url: '/users',
        templateUrl: 'views/users.html',
        controller: 'UsersCtrl'
      })
      .state('users/id', {
        url: '/users/:userId',
        templateUrl: 'views/users.html',
        controller: 'UsersCtrl'
      });
  }
]);
