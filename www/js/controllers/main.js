angular.module('meetMeApp.controller.main', [])
  .controller('MainCtrl', ['$scope', function ($scope) {
    $scope.test = 'default';

    $scope.login = function() {
      $scope.ref = window.open('http://meetme123.com:3000/auth/facebook/', '_blank', 'location=no,toolbar=no');
      $scope.ref.addEventListener('loadstart', function(event){
        if (event.url === 'http://meetme123.com:3000/') {
          $scope.test = 'asdf';
          $scope.ref.close();
        }
      });
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

  }]);
