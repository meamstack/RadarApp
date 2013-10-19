angular.module('meetMeApp.controller.main', [])
  .controller('MainCtrl', ['$scope', '$navigate', '$timeout', function ($scope, $navigate, $timeout) {

    $scope.$navigate = $navigate;
    $scope.login = function() {

      var ref = window.open('http://myradar.co/auth/facebook', '_blank', 'location=no,toolbar=no');
      ref.addEventListener('loadstart', function(event){
        if (event.url === 'http://myradar.co/') {
          ref.close();
          $timeout(function(){
            $scope.$navigate.go('/map', 'slide');
          }, 0);
        }
      });
    };

}]);

