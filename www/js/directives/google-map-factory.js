var googleMapService = angular.module("google-map-service", []);

googleMapService.factory('googleMapInit', function () {
    // initialize the google Maps   
  
 
   
   var initializeGoogleMap = function() {
    // set latitude and longitude to center the map around
    var latlng = new google.maps.LatLng(37.79, 
                      -122.4);
    
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
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      draggable: true,
      disableDoubleClickZoom: false,
      keyboardShortcuts: true
    };
    var map = new google.maps.Map(document.getElementById("mapCanvas"), myOptions);
    if (false) {
      var trafficLayer = new google.maps.TrafficLayer();
      trafficLayer.setMap(map);
    }
    if (false) {
      var bikeLayer = new google.maps.BicyclingLayer();
      bikeLayer.setMap(map);
    }
    if (true) {
      addMarker(map,37.7954,-122.3942,"San Francisco Ferry Building");
    }
    }

    // window.onload = initializeGoogleMap();

   // Add a marker to the map at specified latitude and longitude with tooltip
   function addMarker(map,lat,long,titleText) {
      var markerLatlng = new google.maps.LatLng(lat,long);
      var marker = new google.maps.Marker({
          position: markerLatlng, 
          map: map, 
          title:"San Francisco Ferry Building",
      icon: "http://code.google.com/apis/maps/documentation/javascript/examples/images/beachflag.png"});   
   }

  return {
    initializeGoogleMap: initializeGoogleMap
    addMarker: addMarker
  }

});
  
// EndOAWidget_Instance_2187524
