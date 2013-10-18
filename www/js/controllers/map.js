angular.module('meetMeApp.controller.map', [])
  .controller('MapCtrl', ['$scope', 'userData', 'googleMapInit', 'googleMapLatLon', function ($scope, userData, googleMapInit, googleMapLatLon) {
    var date = new Date();

    // $scope.clockHour = date.getHours();
    // $scope.clockMinute = (0+date.getMinutes().toString()).slice(-2);
    
    var map;
    var newTime;
    var origTime = date.getHours() * 60 + date.getMinutes();
    var pixels = 960;// iphone 4 screen size - may need to change
    var totalMinutes = 1440; // minutes in a day
    $scope.minute = (0 + (origTime % 60).toString()).slice(-2);
    $scope.hour = Math.floor(origTime / 60) % 24;
    $scope.hourpm = $scope.hour % 12;
    if ($scope.hour > 12){
      $scope.ampm = 'PM';
    } else $scope.ampm = 'AM';

    $scope.changeTime = function(e) {
      var deltaMins = Math.floor((e.gesture.deltaY / pixels) * totalMinutes); // change in minutes
      newTime = origTime + deltaMins;
      $scope.minute = (0+(newTime % 60).toString()).slice(-2);
      $scope.hour = Math.floor(newTime / 60) % 24;
      $scope.hourpm = $scope.hour % 12;
      if ($scope.hour > 12){
        $scope.ampm = 'PM';
      } else $scope.ampm = 'AM';
      // $scope.addMarker(map);
    };
    $scope.release = function(e){
      origTime = newTime;
    };



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

    var request = {
      location: [37.800305,-122.409239],
      date: {
        year: 2013,
        month: 10,
        day: 06
      },
      maxD: 1
    };
    request = JSON.stringify(request);
    var url = 'http://myradar.co/api';


    // $http.post(url + '/findEvents', request)
    // .success(function(data) {
    //   $scope.newEvents = data;
    //   $scope.addMarker();
    // })
    // .error(function(error){
    //   $scope.newEvents = error;
    // });

   googleMapInit.initializeGoogleMap();

}]);

