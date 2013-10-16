angular.module('meetMeApp.service.eventLocation', [])
  .factory('googleMapLatLon', function () {
    console.log('googlemap nullify lat and long');
    var lat = null;
    var lon = null;

    var set = function(latitude,longitude){
      lat = latitude;
      lon = longitude;
    };

    var get = function() {
      return [lat,lon];
    };

    return {
      set: set,
      get:get
    };
  });
