angular.module('andelfire.controllers')
  .controller('KbCtrl',['$scope', '$stateParams', 'Toast', 'Users',
    function($scope, $stateParams, Toast, Users) {
      $scope.SaveKbArticle = function() {
        console.log('Hello world');
        
      }
      // $scope.markdown = '> Enter Article using markdown';
}]);