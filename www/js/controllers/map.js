angular.module('meetMeApp.controller.map', [])
  .controller('MapCtrl', ['$scope', 'userData', '$http', 'googleMapInit', 'googleMapLatLon', function ($scope, userData, $http, googleMapInit, googleMapLatLon) {
    var date = new Date();
    // $scope.clockHour = date.getHours();
    // $scope.clockMinute = (0+date.getMinutes().toString()).slice(-2);
    
    // var map;
    // var newTime;
    // var origTime = date.getHours() * 60 + date.getMinutes();
    // var pixels = 960;// iphone 4 screen size - may need to change
    // var totalMinutes = 1440; // minutes in a day
    // $scope.minute = (0 + (origTime % 60).toString()).slice(-2);
    // $scope.hour = Math.floor(origTime / 60) % 24;
    // $scope.hourpm = $scope.hour % 12;
    // if ($scope.hour > 12){
    //   $scope.ampm = 'PM';
    // } else $scope.ampm = 'AM';

    // $scope.changeTime = function(e) {
    //   var deltaMins = Math.floor((e.gesture.deltaY / pixels) * totalMinutes); // change in minutes
    //   newTime = origTime + deltaMins;
    //   $scope.minute = (0+(newTime % 60).toString()).slice(-2);
    //   $scope.hour = Math.floor(newTime / 60) % 24;
    //   $scope.hourpm = $scope.hour % 12;
    //   if ($scope.hour > 12){
    //     $scope.ampm = 'PM';
    //   } else $scope.ampm = 'AM';
    //   // $scope.addMarker(map);
    // };
    // $scope.releaseTime = function(e){
    //   origTime = newTime;
    //   // $scope.addMarker();
    // };



    var initialize = function() {
      var promise = userData.init();
      promise.then(function(retrievedUserData) {
        $scope.user = retrievedUserData;
      });
    };

    initialize();

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

    $scope.addMarker = function () {
      map = googleMapInit.fetchMap();

      //attaches the data to markers and renders el
      for (var i = 0; i < $scope.newEvents.length; i++) {
        var name =  $scope.newEvents[i].name;
        var img = $scope.newEvents[i].photo;
        var description = $scope.newEvents[i].description;
        var evtId = $scope.newEvents[i]._id;
        var total = $scope.total || 1;//add this to the database
        el = '<div id="infoWindow"><p id="description">' + name + ' : ' + description + '</p><img src="' + img + '"></img><br><text>People attending: ' + total + '</text><button ng-click="addPerson(' + evtId + ')">+</button></div>';
        googleMapInit.addMarker(map, $scope.newEvents[i].location[0], $scope.newEvents[i].location[1], el);
      }
    };


    //dummy data for $scope.newEvents
    $scope.newEvents = [
        {
          name: "Free pizza @ Hack reactor!",
          description: 'awesomeness!',
          location: [37.785427,-122.40572],
          time: 'Fri Oct 18 2013 18:59:16 GMT-0700 (PDT)',
          photo: 'img/fun.jpg',
          activity: 'eat'
        }, {
          name: "Goo time!",
          description: 'Who knows what!',
          location: [37.789984,-122.40523],
          time: 'Fri Oct 18 2013 19:59:16 GMT-0700 (PDT)',
          photo: 'img/fun.jpg',
          activity: 'party'
        }, {
          name: 'Thursday night footbal!!',
          description: 'Chips and tacos',
          location: [37.7836,-122.408904],
          time: 'Fri Oct 18 2013 20:59:16 GMT-0700 (PDT)',
          photo: 'http://i.imgur.com/QTITt2D.jpg',
          activity: 'pizza'
        }
    ];

    // $scope.setLocation = function(){
      // googleMapLatLon.set(37.705427,-122.39572);
    // };

    // var request = {
    //   location: [37.800305,-122.409239],
    //   date: {
    //     year: 2013,
    //     month: 10,
    //     day: 06
    //   },
    //   maxD: 1
    // };
    // request = JSON.stringify(request);
    // var url = 'http://myradar.co/api';

    // $http.post(url + '/findEvents', request)
    // .success(function(data) {
    //   $scope.newEvents = data;
    //   $scope.addMarker();
    // })
    // .error(function(error){
    //   alert('this is the error',error)
    //   $scope.newEvents = error;
    // });

    googleMapInit.initializeGoogleMap();
    $scope.addMarker();

}]);

