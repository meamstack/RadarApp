angular.module('meetMeApp.controller.map', [])
  .controller('MapCtrl', ['$scope', 'userData', 'googleMapInit', 'googleMapLatLon', function ($scope, userData, googleMapInit, googleMapLatLon) {
    var date = new Date();
    $scope.hour = date.getHours();
    $scope.minute = date.getMinutes();

    var initialize = function() {
      var promise = userData.init();
      promise.then(function(retrievedUserData) {
        $scope.user = retrievedUserData;
      });
    };

    initialize();

    $scope.addMarker = function () {
      map = googleMapInit.fetchMap();

      //attaches the data to markers and renders el
      for (var i = 0; i < $scope.newEvents.length; i++) {
        var name =  $scope.newEvents[i].name;
        var img = $scope.newEvents[i].photo;
        var description = $scope.newEvents[i].description;
        var evtId = $scope.newEvents[i]._id;
        var total = $scope.total || 1;//add this to the database
        el = '<div id="infoWindow"><p id="description">' + name + ' : ' + description + '</p><img src="' + img + '"></img><br><text>People attending: ' + total + '</text><map-markers></map-markers></div>';
        googleMapInit.addMarker(map, $scope.newEvents[i].location[0], $scope.newEvents[i].location[1], el);
      }
    };


  var eventPromise = googleMapInit.getMarkers();
  eventPromise.then(function(events) {
    $scope.newEvents = events;
    console.log($scope.newEvents);
    $scope.addMarker();
  });

  googleMapInit.initializeGoogleMap();

}]);

