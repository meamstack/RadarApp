angular.module('meetMeApp.controller.map', [])
  .controller('MapCtrl', ['$scope', 'googleMapInit', function ($scope, googleMapInit) {
    $scope.addMarker = function() {
      googleMapInit.addMarker(map,37.785427,-122.40572, "Hi")
    }
    googleMapInit.initializeGoogleMap();
    $scope.slide = function () {
      var element = document.getElementById('hourSlider');
      // alert('test');
      // element.addEventListener('swipedown', function (event) {
      //   if (event.targetTouches.length === 1) 
      //     var touch = event.targetTouches[0];
      //     alert('touched');
      // });
      var hour = 1;
      var hammertime = Hammer(element).on("swipeup", function(event, hour) {
        hour++;
    });

  };
}]);

