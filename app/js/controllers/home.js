angular.module('andelfire.controllers')
  .controller('HomeCtrl', ['$scope', '$state', '$mdBottomSheet', 'Authentication', 'toastr', 'KbArticles', '$rootScope', 'Refs', '$timeout', 'blockUI',
    function($scope, $state, $mdBottomSheet, Authentication, toastr, KbArticles, $rootScope, Refs, $timeout, blockUI) {

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
        swal({
          title: "Are you sure?",
          text: "You will not be able to recover this imaginary file!",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: "Yes, delete it!",
          closeOnConfirm: true,
          allowOutsideClick: false
        }, function() {
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
