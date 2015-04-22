angular.module('andelfire.controllers')
  .controller('MainCtrl', ['$scope', 'Authentication', 'Refs', '$state', '$rootScope', '$timeout', 'KbArticles', '$location',
    function($scope, Authentication, Refs, $state, $rootScope, $timeout, KbArticles, $location) {
      $rootScope.currentUser = Refs.root.getAuth();
      $scope.login = function() {
        Authentication.login(function(err, authData) {
          if (authData) {
            $state.go('default');
            $timeout(function() {
              $rootScope.currentUser = Refs.root.getAuth();
            });
          }
        });
      };

      $scope.logout = function() {
        Authentication.logout();
        $state.go('landingPage', {}, {reload: true});
      };


      KbArticles.all().$loaded().then(function(data) {
        $scope.kbarticles = data;
        $('.preloader-wrapper').hide();

      });

      $scope.todos = [{
        face: 'http://0.gravatar.com/avatar/',
        what: 'Brunch this weekend?',
        who: 'Min Li Chan',
        when: '3:08PM',
        notes: " I'll be in your neighborhood doing errands"
      }, {
        face: 'http://0.gravatar.com/avatar/',
        what: 'Brunch this weekend?',
        who: 'Min Li Chan',
        when: '3:08PM',
        notes: " I'll be in your neighborhood doing errands"
      }, {
        face: 'http://0.gravatar.com/avatar/',
        what: 'Brunch this weekend?',
        who: 'Min Li Chan',
        when: '3:08PM',
        notes: " I'll be in your neighborhood doing errands"
      }, {
        face: 'http://0.gravatar.com/avatar/',
        what: 'Brunch this weekend?',
        who: 'Min Li Chan',
        when: '3:08PM',
        notes: " I'll be in your neighborhood doing errands"
      }, {
        face: 'http://0.gravatar.com/avatar/',
        what: 'Brunch this weekend?',
        who: 'Min Li Chan',
        when: '3:08PM',
        notes: " I'll be in your neighborhood doing errands"
      }, ];
    }
  ]);
