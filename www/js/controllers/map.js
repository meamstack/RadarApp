
angular.module('meetMeApp.controller.map', ['ui.map'])
  .controller('MapCtrl', ['$scope', '$compile', 'userData', '$http', 'googleMapInit', 'googleMapLatLon', function ($scope, $compile, userData, $http, googleMapInit, googleMapLatLon) {
    var date = new Date();
    $scope.clockHour = date.getHours();
    $scope.clockMinute = (0+date.getMinutes().toString()).slice(-2);
    
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

  // $scope.addCenterMarker = function () {
  //   $scope.centerMarker = new google.maps.Marker({
  //     map: $scope.myMap,
  //     position: $scope.myMap.getCenter(),
  //     draggable:true,
  //     animation: google.maps.Animation.DROP,
  //     title: 'Create an Event',
  //     url:'#/createActivity',
  //     icon: "http://library.csun.edu/images/google_maps/marker-blue.png"
  //   })
    // google.maps.event.addListener($scope.centerMarker, 'click', function() {
    //   console.log('clicked ');
    //   var lat = $scope.centerMarker.getPosition().lat();
    //   var lng = $scope.centerMarker.getPosition().lng();
    //   $scope.myMap.set(lat, lng);
    //   window.location.href = '#/createActivity'; // Use $location for this.

    // });
  //};


  $scope.createActivity = function () {
    console.log('creating activity');
    var lat = $scope.myMap.getCenter()[0];
    var lng = $scope.myMap.getCenter()[0];
    console.log(lat, lng);
    googleMapLatLon.set(lat, lng);
    //$scope.myMap.set(lat, lng);
    window.location.href = '#/createActivity';
  }

  $scope.addMarker = function (objs) {

    angular.forEach(objs, function(obj) {
      $scope.myMarkers.push(new google.maps.Marker({
        map: $scope.myMap,
        position: new google.maps.LatLng(obj.location[0], obj.location[1]),
        animation: google.maps.Animation.DROP,
        obj: obj
      }))
    })
  };
  
  $scope.openMarkerInfo = function (marker) {

    $scope.currentMarker = marker;
    $scope.currentMarkerDes = {'description':marker.obj['description'],'name':marker.obj['name'] };
    $scope.currentMarkerImg = marker.obj['photo'];
    $scope.currentMarkerTotal = marker.obj['total'] || 1;
    $scope.myInfoWindow.open($scope.myMap, marker);

    // don't mess with this, EVER. Well if you are curious, this is unbinding the click event to angular-ui events. 
    var a = $($scope.myInfoWindow.content).find('a');
    if (!a.data('click-bound')) {
      a.data('click-bound', true);
      a.click(function() {$scope.$apply(function () {
        $scope.currentMarkerTotal++;
      })})
    }
  };
  $scope.currentMarkerAddPerson = function() {
    debugger;
    console.log($scope);//$scope.currentMarkerTotal++;
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
    $http.post(url + '/findEvents', request)
    .success(function(data) {
      $scope.newEvents = data;
      $scope.addMarker($scope.newEvents);
      //$scope.centerMarker = $scope.addCenterMarker();
      console.log($scope.newEvents);
    })
    .error(function(error){
      $scope.newEvents = error;
    });
  }

}]);

