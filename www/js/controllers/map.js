angular.module('meetMeApp.controller.map', [])
  .controller('MapCtrl', ['$scope', '$http', 'googleMapInit', function ($scope, $http, googleMapInit) {
    console.log('its working')
    $scope.addMarker = function() {
      map = googleMapInit.fetchMap();
      googleMapInit.addMarker(map,37.785427,-122.40572, "Hi")
    }
    var request = {
      location: [37.800305,-122.409239],
      date: {
        year: "2013",
        month: "10",
        day: "06"
      },
      maxD: 1
    };
    $http.post('http://54.200.135.103:9000/api/findEvents',request).success(function(data){
      console.log(data)
      alert(data.name)
    })
    $http.get('http://padshacker.com/api/getUser').success(function(data){
      console.log(data)
    })
    googleMapInit.initializeGoogleMap();
  }]
);

