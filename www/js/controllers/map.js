angular.module('meetMeApp.controller.map', [])
  .controller('MapCtrl', ['$scope', 'googleMapInit', function ($scope, googleMapInit) {
    console.log('its working')
    $scope.addMarker = function() {
      console.log('new marker')
      map = googleMapInit.fetchMap();
      googleMapInit.addMarker(map,37.785427,-122.40572, "Hi")
    }
    googleMapInit.initializeGoogleMap();
  }]
);

