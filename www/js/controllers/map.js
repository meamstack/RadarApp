angular.module('meetMeApp.controller.map', ['ui.map'])
  .controller('MapCtrl', ['$scope', '$compile', 'userData', '$http', 'googleMapInit', 'googleMapLatLon', function ($scope, $compile, userData, $http, googleMapInit, googleMapLatLon) {

    $scope.myMarkers = [];
    $scope.mapOptions = {
      center: new google.maps.LatLng(37.79,-122.4),
      zoom: 13,
      navigationControl: false,
      navigationControlOptions: {
        style: google.maps.NavigationControlStyle.DEFAULT,
        position: google.maps.ControlPosition.TOP_LEFT },
      mapTypeControl: false,
      mapTypeControlOptions: {
        style: google.maps.MapTypeControlStyle.DEFAULT,
        position: google.maps.ControlPosition.TOP_RIGHT },

      scaleControl: false,
      scaleControlOptions: {
        position: google.maps.ControlPosition.BOTTOM_LEFT },
      streetViewControl: false,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      draggable: true,
      disableDoubleClickZoom: false,
      keyboardShortcuts: true
  };

  $scope.addMarker = function (evnt) {

    console.log('addMarker' + $index);
    $scope.myMarkers.push(new google.maps.Marker({
      map: $scope.myMap,
      position: evnt.['location']//change to event location
    }))
  }
  $scope.openMarkerInfo = function(marker) {
    $scope.currentMarker = marker;
    $scope.currentMarkerDes = marker.getPosition().lat();
    $scope.currentMarkerLng = marker.getPosition().lng();
    $scope.myInfoWindow.open($scope.myMap, marker);
  };
   
  $scope.addPerson = function(total) {
    var total = total || 1;
    total++;
    console.log(total);
  };
  $scope.newEvents = function ($event) {
    var request = {
      location: $scope.mapOptions['center'],
      date: {
        year: 2013,
        month: 10,
        day: 06
      },
      maxD: 1
    };
    request = JSON.stringify(request);
    var url = 'http://myradar.co/api';
    // var url = 'http://meetme123.com:3000/api';


    $http.post(url + '/findEvents', request)
    .success(function(data) {
      $scope.newEvents = data;
      angular.forEach($scope.newEvents, $scope.addMarker(evnt));
      console.log(data);

    })
    .error(function(error){
      $scope.newEvents = error;
    });
  }
  // $scope.$watch('mapOptions.zoom', function(n) {
  //   if (n) {
  //     $scope.myMap.setOptions($scope.mapOptions);
  //   }
  // });
  // $scope.$watch('mapOptions.mapTypeId', function(n) {
  //   if (n) {
  //     $scope.myMap.setOptions($scope.mapOptions);
  //   }
  // })
   //  var date = new Date();
   //  $scope.hour = date.getHours();
   //  $scope.minute = date.getMinutes();

   //  var initialize = function() {
   //    var promise = userData.init();
   //    promise.then(function(retrievedUserData) {
   //      $scope.user = retrievedUserData;

   //    });
   //  };

   //  initialize();

   //    $scope.addEventData = function (i) {

   //    }
   //    //user should be able to add to event only once 


   //    $scope.addPerson = function(i) {
   //    //var event = $scope.newEvents[i];\
   //    console.log('clicked');
   //    var total = event.total || 1;
   //    total++;
   //    alert(total);
   //    //var user = userData.getUser();
   //    // $http.post('/api/rsvp', socialEventId)
   //    // .success(function(data) {
   //    //   console.log('user rsvp\'d to event ', data);
   //    // }).error(function(err) {
   //    //   if(err) throw err;
   //    // });
   //  }

   //  $scope.addMarker = function () {
   //    map = googleMapInit.fetchMap();

   //    //attaches the data to markers and renders el
   //    for (var i = 0; i < $scope.newEvents.length; i++) {
   //      var name =  $scope.newEvents[i].name;
   //      var img = $scope.newEvents[i].photo;
   //      var description = $scope.newEvents[i].description;
   //      var evtId = $scope.newEvents[i]._id;
   //      var total = $scope.total || 1;//add this to the database
   //      //el = '<div id="infoWindow"><p id="description">' + name + ' : ' + description + '</p><img src="' + img + '"></img><br><text ng-init="total="'+ total +'"">People attending: {{total}} </text><button ng-click="addPerson()">+</button></div>';
   //      // console.log($scope);

   //      // begin larry cod
   //      content = '<div id="infoWindow" ng-init="event=newEvents['+i+']"><p id="description">{{event.description}}</p><img src="{{event.img}}"></img><br><text>People attending: {{event.total}} </text><button ng-click="addPerson()">+</button></div>';
   //      // var content = '<div id="infowindow_content">{{'+total+'}}<button ng-click="addPerson('+i+')">+</button></div>';
   //      //console.log('Compiling', content);
   //      var compiled = $compile(content)($scope);
   //      var el = compiled[i];
   //      console.log('Compiled HTML', el);
   //      // end larry code

   //      googleMapInit.addMarker(map, $scope.newEvents[i].location[0], $scope.newEvents[i].location[1], el);
   //    }
   //  };



   //  var eventPromise = googleMapInit.getMarkers();
   //  eventPromise.then(function(events) {
   //    $scope.newEvents = events;
   //    console.log($scope.newEvents);
   //    $scope.addMarker();
   //  });


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
    // // var url = 'http://meetme123.com:3000/api';


    // $http.post(url + '/findEvents', request)
    // .success(function(data) {
    //   $scope.newEvents = data;
    // })
    // .error(function(error){
    //   $scope.newEvents = error;
    // });
    // $scope.newEvents[0];
   // googleMapInit.initializeGoogleMap();
   // google.maps.event.addDomListener(window, 'load', initialize);

}]);

