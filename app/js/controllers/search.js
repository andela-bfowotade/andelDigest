angular.module('andelfire.controllers')
  .controller('SearchCtrl', ['$scope', '$stateParams', 'Users', '$rootScope', 'Refs', 'KbArticles', 'toastr', '$timeout', '$mdDialog', '$window', 'Swal', '$http',
    function($scope, $stateParams, Users, $rootScope, Refs, KbArticles, toastr, $timeout, $mdDialog, $window, Swal, $http) {

      if ($stateParams.tag) {

        KbArticles.all().$loaded().then(function(data) {
          $scope.returnedData = data; //load all articles

          _.forEach($scope.returnedData, function(val, key) {
            $scope.fetchAllTags = val.tags; //fetch tags array from articles

            $scope.loadTagArticles = [];
            for (var i in $scope.fetchAllTags) {
              if ($stateParams.tag === $scope.fetchAllTags[i].category.toLowerCase()) {
                $timeout(function() {
                  $scope.loadTagArticles.push(val);
                });
              }
            };
          });
        });
      }

    }
  ]);
