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
      // $scope.onGeoSuccess = function(position) {
      //   $scope.latitude = position.coords.latitude;
      //   $scope.longitude = position.coords.longitude;
      //   $scope.altitude = position.coords.altitude;
      //   $scope.accuracy = position.coords.accuracy;
      //   $scope.altitudeAccuracy = position.coords.altitudeAccuracy;
      //   $scope.heading = position.coords.heading;
      //   $scope.speed = position.coords.speed;
      //   $scope.timestamp = position.timestamp;
      // };

      // // onError Callback receives a PositionError object
      // //
      // $scope.onError = function(error) {
      //     alert('code: '    + error.code    + '\n' +
      //           'message: ' + error.message + '\n');
      // };
      // $scope.runLocate = function() {
      //   navigator.geolocation.getCurrentPosition($scope.onGeoSuccess, $scope.onError);
      // };
    // Example for angular.mobile.nav - however currently not working with Google Maps
    // $scope.clickdemo = function(){
    //   $scope.$navigate.go('/viewActivity', 'slide');
    // };

}]);
