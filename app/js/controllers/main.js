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
        $state.go('landingPage', {}, {
          reload: true
        });
      };
      var tagArray = [];

      var options = [{
        selector: '#staggered-test',
        offset: 200,
        callback: 'Materialize.showStaggeredList("#staggered-test")'
      }, {
        selector: '#image-test',
        offset: 500,
        callback: 'Materialize.fadeInImage("#image-test")'
      }];
      Materialize.scrollFire(options);

      KbArticles.all().$loaded().then(function(data) {
        $timeout(function() {
          $scope.kbarticles = data;
          _.forEach(data, function(value, key) {
            _.forEach(value.tags, function(val, key) {
              tagArray.push(val.category.toLowerCase());
              $scope.sortTags = _.union(tagArray);
            });
          });
        }, 0);
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
      }];

      $scope.defaultTags = [{
        text: 'Angularjs'
      }, {
        text: 'Ruby on Rails'
      }, {
        text: 'Git Workflow'
      }, {
        text: 'Regulations'
      }];

    }
  ]);
