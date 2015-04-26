angular.module('andelfire.controllers')
  .controller('HomeCtrl', ['$scope', '$state', '$mdBottomSheet', 'Authentication', 'toastr', 'KbArticles', '$rootScope', 'Refs', '$timeout', 'blockUI', 'Swal',
    function($scope, $state, $mdBottomSheet, Authentication, toastr, KbArticles, $rootScope, Refs, $timeout, blockUI, Swal) {

      blockUI.start();
      KbArticles.all().$loaded().then(function(data) {
        $scope.userOwnArticles = data;
        $scope.story = _.chain($scope.userOwnArticles)
          .sortBy('timestamp')
          .reverse()
          .where({
            'uid': $rootScope.currentUser.uid
          })
          .value();
        blockUI.stop();
      });

      $scope.toggleList = function(index) {
        Swal.success(
          "Are you sure?",
          "You will not be able to recover this content!",
          "Yes, delete it!",
          false,
          function() {
            var onComplete = function(error) {
              if (error) {
                toastr.error('Sorry an error occured, please try later');
              } else {
                $state.go($state.current, {}, {
                  reload: true
                });
              }
            };
            $scope.story.splice(index, 0);
            Refs.kbAs.child($scope.story[index].$id).remove(onComplete);
          });
      };
    }
  ]);
