angular.module('meetMeApp.controller.map', [])
  .controller('MapCtrl', ['$rootScope', '$scope', 'googleMapInit', function ($rootScope, $scope, googleMapInit) {
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
      
      
      var hammertime = Hammer(element).on("tap", function(event, time) {
        var date = new Date().toString();
      var time = date.split(" ")[4].split(':')[0];
      console.log(time);
        alert(time);
        time++;
    });

  };
}]);

