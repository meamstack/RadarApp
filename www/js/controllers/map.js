angular.module('meetMeApp.controller.map', [])
  .controller('MapCtrl', ['$scope', '$http', 'googleMapInit', 'googleMapLatLon', function ($scope, $http, googleMapInit, googleMapLatLon) {
    window.console.log('its working');
    $scope.addMarker = function() {
      map = googleMapInit.fetchMap();
      el = '<div><p>Basketball was fun guys!</p><img src="img/meamteam.jpg" height="40px, width="40px"></img></div>';
      googleMapInit.addMarker(map,37.785427,-122.40572, el);
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
      name: 'Thursday night footbal!!',
      description: 'Chips and tacos',
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
    $scope.addMarker();

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

