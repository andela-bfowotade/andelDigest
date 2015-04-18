angular.module('andelfire.controllers')
  .controller('KbCtrl', ['$scope', '$stateParams', 'Users', '$rootScope', 'Refs', 'KbArticles', 'toastr', '$timeout',
    function($scope, $stateParams, Users, $rootScope, Refs, KbArticles, toastr, $timeout) {

      $scope.articles = KbArticles.all();
      if ($stateParams.articleId) {
        $scope.articles.$loaded().then(function() {
          $scope.selectUser(KbArticles.find($stateParams.articleId));
        });
      }

      $scope.selectUser = function(user) {
        $scope.selectedUser = user;
      };

      $scope.updateUser = function() {
        $scope.selectedUser.$save().then(function() {
          Toast($scope.selectedUser.name + ' updated successfully');
        });
      };

      function is_valid_url(url) {
        return /^(http(s)?:\/\/)?(www\.)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/.test(url);
      }

      $scope.pushReference = [];
      $scope.spliceRefence = [];
      $scope.newRefUrl = function() {
        if (is_valid_url($scope.refInput)) {
          $scope.pushReference.push({
            refUrl: $scope.refInput
          });
          angular.forEach($scope.pushReference, function(val, key){
            $scope.getLoopUrl = val;
            console.log(_.values($scope.getLoopUrl));
          });
          console.log(angular.copy($scope.pushReference));
          $scope.refInput = '';

        } else {
          toastr.error('Please Enter A valid Url');
        }
      };

      $scope.toggleList = function(index) {
        $scope.spliceRefence.push($scope.pushReference[index]);
        $scope.pushReference.splice(index, 1);
      };

      $('.ref-input').on('focus', function() {
        $('.ref-input').attr('placeholder', 'Type url in here');
      });

      $('.ref-input').keypress(function(e) {
        var key = e.which;
        if (key == 13) {
          $timeout(function() {
            $scope.newRefUrl();
            return false;

          });
        }
      });

      $scope.SaveKbArticle = function() {
        //save article details
        $scope.push_key = Refs.kbAs.push({
          article: $scope.markdown,
          referenceUrls: angular.copy($scope.pushReference),
          uid: $rootScope.currentUser.uid,
          timestamp: new Date().getTime(),
        }, function(err) {
          if (!err) {
          }
        });
        // save push key
        Refs.kbAs.child($scope.push_key.key()).update({
          push_key: $scope.push_key.key()
        }, function(err) {
          if (!err) {
            swal({
              title: 'Cool!!',
              text: 'Knowledge Article has been created. Thank you',
              type: 'success',
            });
          } else {
            swal({
              title: 'OOPS!!',
              text: 'An error occured, please try later or check your internet connection',
              type: 'error'
            });
          }
        });
      };

    }
  ]);
