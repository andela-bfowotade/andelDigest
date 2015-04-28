/* define our modules */
angular.module('andelfire.services', ['firebase', 'ngCookies']);
angular.module('andelfire.filters', []);
angular.module('andelfire.directives', ['monospaced.elastic']);
angular.module('andelfire.controllers', []);

window.AndelFire = angular.module("AndelFire", [
  'ui.router',
  'markdown',
  'ngSanitize',
  'toastr',
  'blockUI',
  'jackrabbitsgroup.angular-infinitescroll',
  'oitozero.ngSweetAlert',
  'angularUtils.directives.dirPagination',
  'andelfire.controllers',
  'andelfire.directives',
  'andelfire.filters',
  'angularMoment',
  'ngLoader',
  'ngTagsInput',
  'ngFx',
  'andelfire.services',
  'ngAnimate',
  'ngMaterial',
]);

AndelFire.run(['$rootScope', '$state', 'Authentication', 'Refs', 'Toast', '$location',
  function($rootScope, $state, Authentication, Refs, Toast, $location) {
    $rootScope._ = window._;
    $rootScope.moment = window.moment;
    $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams, error) {
      var states = (toState.name !== 'about' && toState.name !== 'landingPage' && toState.name !== 'kbarticle/id' && toState.name !== 'error_404');
      if (!Refs.root.getAuth() && states && !$location.search().token) {
        console.log(states, 'aaa');
        event.preventDefault();
        $state.go('error_404');
      }
    });

    $rootScope.authCallback = function(authData) {
      Authentication.auth(authData, function(user) {
        if (user) {} else {
          // logged out
          Authentication.logout();
          $state.go('landingPage');
        }
      });
    };

    Refs.root.onAuth($rootScope.authCallback);
  }
]);

/* application routes */
AndelFire.config(['$stateProvider', '$locationProvider', '$urlRouterProvider',
  function($stateProvider, $locationProvider, $urlRouterProvider) {
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/');

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
      .state('kbarticle', {
        url: '/kbarticle',
        templateUrl: 'views/kbarticle.html',
        controller: 'KbCtrl'
      })
      .state('kbarticle/id', {
        url: '/kbarticle/:kbId',
        templateUrl: 'views/singlearticle.html',
        controller: 'KbCtrl'
      })
      .state('kbarticle/edit/id', {
        url: '/kbarticle/edit/:kbId',
        templateUrl: 'views/kbarticle.html',
        controller: 'KbCtrl'
      })
      .state('search/tag', {
        url: '/search/tag/:tag',
        templateUrl: 'views/search.html',
        controller: 'SearchCtrl'
      })
      .state('error_404', {
        url: '/error_404',
        templateUrl: '404.html'
      });
  }
]);
