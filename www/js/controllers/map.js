var center = {lat:37.7879,lon:-122.4006,zoom:5}
angular.module('meetMeApp.controller.map', [])
  .controller('MapCtrl', ['$scope', function ($scope) {
    angular.extend($scope, {
         center: {
             lat: 37.787,
             lng: -122.400,
             zoom: 14
         }
     });
  }]
);
