var googleMapFactory = angular.module("google-map-service", []);

googleMapFactory.factory('googleMapInit', function () {
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
    if (false) {
      var trafficLayer = new google.maps.TrafficLayer();
      trafficLayer.setMap(map);
    }
    if (false) {
      var bikeLayer = new google.maps.BicyclingLayer();
      bikeLayer.setMap(map);
    }
    // if (true) {
    //   addMarker(map,37.7954,-122.3942,"San Francisco Ferry Building");
    // }
    localMap = map; // reference map for future use
  };

  var fetchMap = function(){
    return localMap;
  };
    // window.onload = initializeGoogleMap();

   // Add a marker to the map at specified latitude and longitude with tooltip
   function addMarker(map,lat,long,contentString) {
      var infowindow = new google.maps.InfoWindow({content:contentString,
        maxWidth:400});
      var markerLatlng = new google.maps.LatLng(lat,long);
      var marker = new google.maps.Marker({
          position: markerLatlng, 
          map: map, 
          title:"San Francisco Ferry Building"});
      // icon: "http://library.csun.edu/images/google_maps/marker-blue.png"});   
    google.maps.event.addListener(marker, 'click', function() {
      infowindow.open(map,marker);
    });
   };


  return {
    initializeGoogleMap: initializeGoogleMap,
    addMarker: addMarker,
    fetchMap: fetchMap
  }

});
  
// EndOAWidget_Instance_2187524
