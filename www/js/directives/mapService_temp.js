angular.module("meetMeApp.directive.map", []);
googleMapFactory.directive('mapMarkers', ['$q', 'googleMapInit', function($q, googleMapInit) {
  // var el = '<button ng-click="addPerson()">+</button>';
  // return {
  //   restrict: 'EA',
  //   transclude: true,
  //   scope: {
  //     events: '='
  //     // location: '='
  //   },
  //   template: '_______________________________________' + events[0].name,
  //   // '<div id="infoWindow"><p id="description">' + name + ' : ' + description + '</p><img src="' + img + '"></img><br><text>People attending: ' + total + '</text><button ng-click="addPerson()">+</button></div>',
  //   compile: function(tElement, tAttrs, transclude) {
  //     var link = function(scope, ele, attrs, ctrl) {
  //       // Initialize google maps
  //       // googleMapInit.initializeGoogleMap();
  //       // Add all the markers
  //       // scope.$watch(events, function() {
  //       //   console.log(events.length);
  //       // });
  //       // for (var i = 0; i < scope.events.length; i++) {
  //         // console.log(i);
  //         // var marker = tAttrs.markers[i];
  //         // scope.event = marker;
  //         // var e = transclude(scope, function(clone) {
  //         //   // Individual marker element
  //         // });
  //       // Set up map controls
  //     };

  //     return link;
  //   }
  
}]);
/*
    $scope.addMarker = function () {
      map = googleMapInit.fetchMap();

      //attaches the data to markers and renders el
      for (var i = 0; i < $scope.newEvents.length; i++) {
        var name =  $scope.newEvents[i].name;
        var img = $scope.newEvents[i].photo;
        var description = $scope.newEvents[i].description;
        var evtId = $scope.newEvents[i]._id;
        var total = $scope.total || 1;//add this to the database
        googleMapInit.addMarker(map, $scope.newEvents[i].location[0], $scope.newEvents[i].location[1], el);
      }
    };


    $scope.addPerson = function(socialEventId) {
      console.log('hello');
      alert(socialEventId, 'addperson');
      // $http.post('/api/rsvp', socialEventId)
      // .success(function(data) {
      //   console.log('user rsvp\'d to event ', data);
      // }).error(function(err) {
      //   if(err) throw err;
      // });
    };
    */
