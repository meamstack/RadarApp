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
    $scope.currentMarkerTotal = 1;//marker.obj['total'] || 1;
    $scope.currentMarkerAddPerson = function() {var num = 1; num++;$scope.currentMarkerTotal = num;}//function() {$scope.currentMarkerTotal++;};
    $scope.myInfoWindow.open($scope.myMap, marker);

  };
   
  // $scope.addPerson = function (currentMarker) {
  //   $scope.currentMarkerTotal++;
  // };
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
      console.log($scope.newEvents);
    })
    .error(function(error){
      $scope.newEvents = error;
    });
  }

}]);

