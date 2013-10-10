angular.module('meetMeApp.controller.map', [])
  .controller('MapCtrl', ['$scope', '$http', 'googleMapInit', function ($scope, $http, googleMapInit) {
    console.log('its working')
    $scope.addMarker = function() {
      map = googleMapInit.fetchMap();
      googleMapInit.addMarker(map,37.785427,-122.40572, "Basketball with Shawn");
      googleMapInit.addMarker(map,37.784221,-122.40213, "Free pizza @ Hack reactor!");
      googleMapInit.addMarker(map,37.783842,-122.40898, "Goo time!");
      googleMapInit.addMarker(map,37.789984,-122.40523, "Goo time!");
    }
    var request = {
      location: ['37.800305','-122.409239'],
      date: {
        year: "2013",
        month: "10",
        day: "06"
      },
      maxD: 1
    };
    var url = 'http://54.200.135.103:9000/api/findEvents';
    // $http({
    //   method: 'POST',
    //   url: url,
    //   dataType: 'json',
    //   data: request,
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // }).success(function(data) {
    //   console.log(data);
    // })
    // $http.post(url,request)
    // .success(function(data){
    //   console.log(data);
    //   alert(data.name);
    // });
    // $http.get('http://padshacker.com/api/getUser')
    // .success(function(data){
    //   console.log(data);
    // })
  $http.post('/api', request)
  .success(function(data) {
    console.log('data success, ', data);
  })
  .error(function(error){
    console.log('this is the error',error)
  });

    googleMapInit.initializeGoogleMap();
  }]
);

