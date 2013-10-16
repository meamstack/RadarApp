var googleMapFactory = angular.module("google-map-service", []);

googleMapFactory.factory('googleMapInit', ['googleMapLatLon', function (googleMapLatLon) {
    // initialize the google Maps
   var localMap; // refer to map for events

   var initializeGoogleMap = function() {
    // set latitude and longitude to center the map around
    var latlng = new google.maps.LatLng(37.79,-122.4);

    // set up the default options
    var myOptions = {
      zoom: 14,
      center: latlng,
      navigationControl: false,
      navigationControlOptions:
        {style: google.maps.NavigationControlStyle.DEFAULT,
       position: google.maps.ControlPosition.TOP_LEFT },
      mapTypeControl: false,
      mapTypeControlOptions:
        {style: google.maps.MapTypeControlStyle.DEFAULT,
       position: google.maps.ControlPosition.TOP_RIGHT },

      scaleControl: false,
       scaleControlOptions: {
            position: google.maps.ControlPosition.BOTTOM_LEFT
        },
      streetViewControl: false,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      draggable: true,
      disableDoubleClickZoom: false,
      keyboardShortcuts: true
    };
    var map = new google.maps.Map(document.getElementById("mapCanvas"), myOptions);
    var centerMarker = new google.maps.Marker({
      map: map,
      position: map.getCenter(),
      draggable:true,
      animation: google.maps.Animation.DROP,
      title: 'Create an Event',
      url:'#/createActivity',
      icon: "http://library.csun.edu/images/google_maps/marker-blue.png"
    });
    google.maps.event.addListener(centerMarker, 'click', function() {
      var lat = centerMarker.getPosition().lat();
      var lng = centerMarker.getPosition().lng();
      googleMapLatLon.set(lat, lng);
      window.location.href = centerMarker.url;
    });
    if (false) {
      var trafficLayer = new google.maps.TrafficLayer();
      trafficLayer.setMap(map);
    }
    if (false) {
      var bikeLayer = new google.maps.BicyclingLayer();
      bikeLayer.setMap(map);
    }
    localMap = map; // reference map for future use
  };

  var fetchMap = function(){
    return localMap;
  };

   // Add a marker to the map at specified latitude and longitude with tooltip
  var addMarker = function(map,lat,long,el) {
    var infowindow = new google.maps.InfoWindow({
      content:el,
      //disableAutoPan: true
    });//disableAutoPan prevents skipping when info window opens
    var markerLatlng = new google.maps.LatLng(lat,long);
    var marker = new google.maps.Marker({
      position: markerLatlng, 
      map: map,
      animation: google.maps.Animation.DROP, 
      label: 1
    });
    google.maps.event.addListener(marker, 'click', function() {
      infowindow.open(map,marker);
    });
    //mouseout works when you click on something else on the phone, which is what we want
    google.maps.event.addListener(marker, 'mouseout', function() {
      //infowindow.close(map,marker);
    });

 };

  return {
    initializeGoogleMap: initializeGoogleMap,
    addMarker: addMarker,
    fetchMap: fetchMap
  }

}]);
  
// EndOAWidget_Instance_2187524
