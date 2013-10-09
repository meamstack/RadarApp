var center = {lat:37.7879,lon:-122.4006,zoom:5}
angular.module('meetMeApp.controller.map', [])
  .controller('MapCtrl', ['$scope', function ($scope) {
    $scope.createEvent = function(){
      console.log(this)
    },
    angular.extend($scope, {
         center: {
             lat: 37.787,
             lng: -122.400,
             zoom: 15
         },
         // markers: {
         //    CurrentLocation: {
         //      lat: 37.787,
         //      lng: -122.400,
         //      // focus: true,
         //      draggable: false
         //    }
         // },
         layers: {
            baselayers: {
                // googleTerrain: {
                //     name: 'Google Terrain',
                //     layerType: 'TERRAIN',
                //     type: 'google'
                // },
                // googleHybrid: {
                //     name: 'Google Hybrid',
                //     layerType: 'HYBRID',
                //     type: 'google'
                // },
                googleRoadmap: {
                    name: 'Google Streets',
                    layerType: 'ROADMAP',
                    type: 'google'
                }
            }
        }
     });
  }]
);
