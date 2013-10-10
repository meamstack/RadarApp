angular.module('meetMeApp.controller.map', [])
  .controller('MapCtrl', ['$scope', 'googleMapInit', function ($scope, googleMapInit) {
    console.log('its working')
    googleMapInit.initializeGoogleMap();
  }]
);

