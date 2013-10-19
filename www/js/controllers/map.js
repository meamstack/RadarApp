
angular.module('meetMeApp.controller.map', ['ui.map'])
  .controller('MapCtrl', ['$scope', '$compile', 'userData', '$http', 'googleMapLatLon', function ($scope, $compile, userData, $http, googleMapLatLon) {


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
      zoomControl: false,
      disableDefaultUI:true,
      keyboardShortcuts: true
    };

    $scope.createActivity = function () {
      console.log('creating activity');
      var lat = $scope.myMap.getCenter().lat();
      var lng = $scope.myMap.getCenter().lng();
      //console.log(lat, lng);
      googleMapLatLon.set(lat, lng) ;
      //console.log('lat is ' + $scope.myMap.getCenter().lat());
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
      $scope.currentMarkerId = marker.obj['_id'];
      $scope.currentMarkerDes = {'description':marker.obj['description'],'name':marker.obj['name'] };
      $scope.currentMarkerImg = marker.obj['photo'];
      $scope.currentMarkerTotal = marker.obj['users'].length;
      $scope.myInfoWindow.open($scope.myMap, marker);

      // don't mess with this, EVER. Well if you are curious, this is unbinding the click event to angular-ui events. 
      var a = $($scope.myInfoWindow.content).find('a');
      if (!a.data('click-bound')) {
        a.data('click-bound', true);
        a.click(function() {$scope.$apply(function () {
          
          var request = {
            eventId : $scope.currentMarkerId,
            userId: $scope.currentUserId || 123
          };
          request = JSON.stringify(request);
          var url = 'http://myradar.co/api';
          $http.post(url + '/rsvp', request)
          .success(function(data) {
            $scope.currentMarkerTotal++;
            alert('You are added to ' + $scope.currentMarkerDes['name'] + ' : '+ $scope.currentMarkerDes['description']);
          })
          .error(function(error){
            $scope.addPerson = error;
          });
        })})
      }
    };

    $scope.fetchEvents = function ($event) {
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

