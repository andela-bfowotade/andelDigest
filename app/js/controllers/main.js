angular.module('andelfire.controllers')
.controller('MainCtrl', ['$scope', 'Authentication', '$state',
  function($scope, Authentication, $state) {
    $scope.login = function() {
      Authentication.login(function(err, authData){
        if(authData){
          $state.go('default');
        }
      });
    };

    $scope.logout = function() {
      Authentication.logout();
    };

    $scope.todos = [
      {
        face : 'http://0.gravatar.com/avatar/',
        what: 'Brunch this weekend?',
        who: 'Min Li Chan',
        when: '3:08PM',
        notes: " I'll be in your neighborhood doing errands"
      },
      {
        face : 'http://0.gravatar.com/avatar/',
        what: 'Brunch this weekend?',
        who: 'Min Li Chan',
        when: '3:08PM',
        notes: " I'll be in your neighborhood doing errands"
      },
      {
        face : 'http://0.gravatar.com/avatar/',
        what: 'Brunch this weekend?',
        who: 'Min Li Chan',
        when: '3:08PM',
        notes: " I'll be in your neighborhood doing errands"
      },
      {
        face : 'http://0.gravatar.com/avatar/',
        what: 'Brunch this weekend?',
        who: 'Min Li Chan',
        when: '3:08PM',
        notes: " I'll be in your neighborhood doing errands"
      },
      {
        face : 'http://0.gravatar.com/avatar/',
        what: 'Brunch this weekend?',
        who: 'Min Li Chan',
        when: '3:08PM',
        notes: " I'll be in your neighborhood doing errands"
      },
    ];

  }
]);
