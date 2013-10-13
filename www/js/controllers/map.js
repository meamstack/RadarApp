angular.module('meetMeApp.controller.map', [])
  .controller('MapCtrl', ['$scope', 'userData', '$http', 'googleMapInit', 'googleMapLatLon', function ($scope, userData, $http, googleMapInit, googleMapLatLon) {
    
    var initialize = function() {
      var promise = userData.init();
      promise.then(function(retrievedUserData) {
        $scope.user = retrievedUserData;
      });
    };

    initialize();

    window.console.log('its working');

    $scope.addMarker = function() {
      map = googleMapInit.fetchMap();
      
      //attaches the data to markers and renders el
      for (var i = 0; i < events.length; i++) {
        var name =  events[i].name;
        var  img = events[i].photo;
        el = '<div><p>'+ name + '</p><img src="' + img + '" height="100px" width="100px"></img></div>';
        googleMapInit.addMarker(map, events[i].location[0], events[i].location[1], el);
      }
    };

    //dummy data for $scope.newEvents
    var events = [
        {
          name: "Free pizza @ Hack reactor!",
          description: 'awesomeness!',
          location: [37.785427,-122.40572],
          time: 'Fri Oct 11 2013 16:59:16 GMT-0700 (PDT)',
          photo: 'img/fun.jpg',
          activity: 'eat'
        }, {
          name: "Goo time!",
          description: 'Who knows what!',
          location: [37.789984,-122.40523],
          time: 'Fri Nov 01 2013 00:00:00 GMT-0700 (PDT)',
          photo: 'img/test.jpg',
          activity: 'party'
        }, {
          name: 'Thursday night footbal!!',
          description: 'Chips and tacos',
          location: [37.7836,-122.408904],
          time: new Date(2013, 10,01),
          photo: 'http://i.imgur.com/QTITt2D.jpg',
          activity: 'pizza'
        }
    ];

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


    // $http.post(url + '/findEvents', request)
    // .success(function(data) {
    //   console.log('data success, ', data);
    //   $scope.newEvents = data;
    // })
    // .error(function(error){
    //   console.log('this is the error',error)
    //   $scope.newEvents = error;
    // });

    var createEvent = {
      name: 'Thursday night footbal!!',
      description: 'Chips and tacos',
      location: [37.7836,-122.408904],
      time: new Date(2013, 10,01),
      photo: 'http://i.imgur.com/QTITt2D.jpg',
      activity: 'pizza'
    }
    createEvent = JSON.stringify(createEvent);

    // $http.post(url + '/createEvent', createEvent)
    // .success(function(data) {
    //   console.log('event successfully created, ', data);
    // })
    // .error(function(error){
    //   console.log('this is the error on creating an event',error)
    //   $scope.newEvents = error;
    // });



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
        return time++;
    });

  };
}]);

