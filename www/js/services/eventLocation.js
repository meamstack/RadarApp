angular.module("meetMeApp.service.eventLocation", [])
  .factory('googleMapLatLon', function () {
    console.log('googlemap nullify lat and long');
    var lat = null;
    var lon = null;

    var set = function(latitude,longitude){
      lat = latitude;
      lon = longitude;
    };

    var get = function() {
      alert('lat and long: ',lat, lon);
      return [lat,lon];
    };

    return {
      set: set,
      get:get
    };
  });
