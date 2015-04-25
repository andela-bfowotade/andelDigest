angular.module('andelfire.controllers')
.controller('MenuCtrl', ['$scope', '$mdBottomSheet',
  function($scope, $mdBottomSheet) {
    $scope.items = [
      { name: 'Likes', icon: 'fa-thumbs-up' },
      { name: 'Title', icon: 'fa-header' }
    ];

    $scope.listItemClick = function($index) {
      var clickedItem = $scope.items[$index];
      $mdBottomSheet.hide(clickedItem);
    };
  }
]);
