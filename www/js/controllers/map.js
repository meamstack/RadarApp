angular.module('meetMeApp.controller.map', [])
  .controller('MapCtrl', ['$scope', 'userData', '$http', 'googleMapInit', 'googleMapLatLon', function ($scope, userData, $http, googleMapInit, googleMapLatLon) {
    var date = new Date();
    $scope.hour = date.getHours();
    $scope.minute = (0+date.getMinutes().toString()).slice(-2);

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
    // $scope.newEvents = [
    //     {
    //       name: "Free pizza @ Hack reactor!",
    //       description: 'awesomeness!',
    //       location: [37.785427,-122.40572],
    //       time: 'Fri Oct 11 2013 16:59:16 GMT-0700 (PDT)',
    //       photo: 'img/fun.jpg',
    //       activity: 'eat'
    //     }, {
    //       name: "Goo time!",
    //       description: 'Who knows what!',
    //       location: [37.789984,-122.40523],
    //       time: 'Fri Nov 01 2013 00:00:00 GMT-0700 (PDT)',
    //       photo: 'img/fun.jpg',
    //       activity: 'party'
    //     }, {
    //       name: 'Thursday night footbal!!',
    //       description: 'Chips and tacos',
    //       location: [37.7836,-122.408904],
    //       time: new Date(2013, 10,01),
    //       photo: 'http://i.imgur.com/QTITt2D.jpg',
    //       activity: 'pizza'
    //     }
    // ];

    // $scope.setLocation = function(){
      // googleMapLatLon.set(37.705427,-122.39572);
    // };

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
    // var url = 'http://meetme123.com:3000/api';


    $http.post(url + '/findEvents', request)
    .success(function(data) {
      $scope.newEvents = data;
      $scope.addMarker();
    })
    .error(function(error){
      alert('this is the error',error)
      $scope.newEvents = error;
    });

    googleMapInit.initializeGoogleMap();

}]);

