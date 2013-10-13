angular.module('meetMeApp.controller.main', [])
  .controller('MainCtrl', ['$scope', '$navigate', '$timeout', function ($scope, $navigate, $timeout) {

    $scope.$navigate = $navigate;
    $scope.login = function() {
      // NOTE: URLS BELOW NEED TO BE CHANGED FOR DEPLOYMENT
      var ref = window.open('http://edhsieh.com/auth/facebook', '_blank', 'location=no,toolbar=no');
      // var ref = window.open('http://meetme123.com:3000/auth/facebook', '_blank', 'location=no,toolbar=no');
      ref.addEventListener('loadstart', function(event){
        if (event.url === 'http://54.200.135.103:9000/') {
        // if (event.url === 'http://meetme123.com:3000/') {
          ref.close();
          $timeout(function(){
            $scope.$navigate.go('/map', 'slide');
          }, 0);
        }
      });
    };

}]);

