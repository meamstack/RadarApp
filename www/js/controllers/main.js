angular.module('meetMeApp.controller.main', [])
  .controller('MainCtrl', ['$scope', '$navigate', '$timeout', function ($scope, $navigate, $timeout) {

    $scope.$navigate = $navigate;
    $scope.login = function() {
      var ref = window.open('http://meetme123.com:3000/auth/facebook', '_blank', 'location=no,toolbar=no');
      ref.addEventListener('loadstart', function(event){
        if (event.url === 'http://meetme123.com:3000/') {
          ref.close();
          $timeout(function(){
            $scope.$navigate.go('/map', 'slide');
          }, 0);
        }
      });
    };

    $scope.changepage = function() {
      location.assign($location.path('/map'));
    };
}]);

