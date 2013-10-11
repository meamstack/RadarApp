angular.module('meetMeApp.controller.map', [])
  .controller('MapCtrl', ['$scope', '$http', 'googleMapInit', 'googleMapLatLon', function ($scope, $http, googleMapInit, googleMapLatLon) {
    window.console.log('its working');
    $scope.addMarker = function() {
      map = googleMapInit.fetchMap();
      googleMapInit.addMarker(map,37.785427,-122.40572, "Basketball with Shawn");
      googleMapInit.addMarker(map,37.784221,-122.40213, "Free pizza @ Hack reactor!");
      googleMapInit.addMarker(map,37.783842,-122.40898, "Goo time!");
      googleMapInit.addMarker(map,37.789984,-122.40523, "Goo time!");
    };

    $scope.setLocation = function(){
      googleMapLatLon.set(37.705427,-122.39572);
    };

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
    var url = 'http://54.200.135.103:9000/api';


    $http.post(url + '/findEvents', request)
    .success(function(data) {
      console.log('data success, ', data);
      $scope.newEvents = data;
    })
    .error(function(error){
      console.log('this is the error',error)
      $scope.newEvents = error;
    });

    var createEvent = {
      name: 'Thursday night football!!',
      description: 'Chips and dip',
      location: [37.7836,-122.408904],
      time: new Date(2013, 10,01),
      photo: 'http://i.imgur.com/QTITt2D.jpg',
      activity: 'pizza'
    }
    createEvent = JSON.stringify(createEvent);

    $http.post(url + '/createEvent', createEvent)
    .success(function(data) {
      console.log('event successfully created, ', data);
    })
    .error(function(error){
      console.log('this is the error on creating an event',error)
      $scope.newEvents = error;
    });



    googleMapInit.initializeGoogleMap();
  }]
);

