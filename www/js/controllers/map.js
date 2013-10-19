
angular.module('meetMeApp.controller.map', ['ui.map'])
  .controller('MapCtrl', ['$scope', '$compile', 'userData', '$http', 'googleMapLatLon', function ($scope, $compile, userData, $http, googleMapLatLon) {
    var date = new Date();
    var dates = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sept','Oct','Nov','Dec'];
    $scope.year = date.getFullYear();
    $scope.month = months[date.getMonth()];
    $scope.date = date.getDate();
    $scope.day = dates[date.getDay()];
    var newDate;
    var pixelsY = 960;// iphone 4 screen size - may need to change
    var totalMinutes = 1440; // minutes in a day
    $scope.minute = (0 + date.getMinutes().toString()).slice(-2);
    
    // Turn 24-hr into 12-hr format and replace 0 with 12 for hours output
    var hourClean = function(hour){
      if (hour > 12){
        $scope.ampm = 'pm';
      } else $scope.ampm = 'am';
      hour = hour % 12;
      if (hour === 0){
        return 12;
      }
      return hour;
    }
    $scope.hourpm = hourClean(date.getHours());

    $scope.changeDay = function(e){
      // One day for every x pixels on line below
      var deltaDays = Math.floor(e.gesture.deltaX / 70);
      newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() + deltaDays, date.getHours(), date.getMinutes());
      $scope.year = newDate.getFullYear();
      $scope.month = months[newDate.getMonth()];
      $scope.date = newDate.getDate();
      $scope.day = dates[newDate.getDay()];
    };

    $scope.changeTime = function(e) {
      var deltaMins = Math.floor((e.gesture.deltaY / pixelsY) * totalMinutes); // change in minutes
      newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes()+deltaMins);
      $scope.year = newDate.getFullYear();
      $scope.month = months[newDate.getMonth()];
      $scope.date = newDate.getDate();
      $scope.day = dates[newDate.getDay()];
      $scope.minute = (0+newDate.getMinutes().toString()).slice(-2);
      $scope.hourpm = hourClean(newDate.getHours());
    };
    $scope.releaseTime = function(e){
      date = newDate;
      var rangeMin = new Date(date.getFullYear(), date.getMonth(),date.getDate(),date.getHours());
      var rangeMax = new Date(date.getFullYear(), date.getMonth(),date.getDate(),date.getHours()+1);
      // Remove all existing markers
      for (var i = 0; i < $scope.myMarkers.length; i++){
        $scope.myMarkers[i].setMap(null);
      }
      // If inside the time range add marker
      var newMarkers = [];
      for (var i = 0; i < $scope.newEvents.length; i++){
        var eventDate = new Date($scope.newEvents[i].time);
        if (eventDate > rangeMin && eventDate < rangeMax){
          newMarkers.push($scope.newEvents[i]);
        } 
      }
      $scope.addMarker(newMarkers);
    };
    // dummy data for $scope.newEvents
    // $scope.newEvents = [
    //     {
    //       name: "Free pizza @ Hack reactor!",
    //       description: 'awesomeness!',
    //       location: [37.785427,-122.40572],
    //       time: 'Thu Oct 17 2013 21:13:38 GMT-0700 (PDT)',
    //       photo: 'img/fun.jpg',
    //       activity: 'eat',
    //       userId: '52589775e57d7f4011000001'
    //     }, {
    //       name: "Goo time!",
    //       description: 'Who knows what!',
    //       location: [37.789984,-122.40523],
    //       time: 'Thu Oct 17 2013 22:13:38 GMT-0700 (PDT)',
    //       photo: 'img/fun.jpg',
    //       activity: 'party',
    //       userId: '52589775e57d7f4011000001'
    //     }, {
    //       name: 'Thursday night footbal!!',
    //       description: 'Chips and tacos',
    //       location: [37.7836,-122.408904],
    //       time: 'Thu Oct 17 2013 23:13:38 GMT-0700 (PDT)',
    //       photo: 'http://i.imgur.com/QTITt2D.jpg',
    //       activity: 'pizza',
    //       userId: '52589775e57d7f4011000001'
    //     }, {
    //       name: 'Thursday night footbal!!',
    //       description: 'Chips and tacos',
    //       location: [37.78365,-122.40891],
    //       time: 'Thu Oct 17 2013 19:13:38 GMT-0700 (PDT)',
    //       photo: 'http://i.imgur.com/QTITt2D.jpg',
    //       activity: 'pizza',
    //       userId: '52589775e57d7f4011000001'
    //     }, {
    //       name: 'Thursday night footbal!!',
    //       description: 'Chips and tacos',
    //       location: [37.78565,-122.41891],
    //       time: 'Thu Oct 17 2013 19:13:38 GMT-0700 (PDT)',
    //       photo: 'http://i.imgur.com/QTITt2D.jpg',
    //       activity: 'pizza',
    //       userId: '52589775e57d7f4011000001'
    //     }
    // ];

    

    // $scope.setLocation = function(){
      // googleMapLatLon.set(37.705427,-122.39572);
    // };

    // var request = {
    //   location: [37.800305,-122.409239],
    //   date: {
    //     year: 2013,
    //     month: 10,
    //     day: 06
    //   },
    //   maxD: 1
    // };
    // request = JSON.stringify(request);
    // var url = 'http://myradar.co/api';

    // $http.post(url + '/findEvents', request)
    // .success(function(data) {
    //   $scope.newEvents = data;
    //   $scope.addMarker();
    // })
    // .error(function(error){
    //   alert('this is the error',error)
    //   $scope.newEvents = error;
    // });

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
      streetViewControl: false,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      draggable: true,
      disableDoubleClickZoom: false,
      keyboardShortcuts: true
    };

  $scope.createActivity = function () {
    console.log('creating activity');
    var lat = $scope.myMap.getCenter().lat();
    var lng = $scope.myMap.getCenter().lng();
    //console.log(lat, lng);
    $timeout(function(){
      googleMapLatLon.set(lat, lng) ;
      window.location.href = '#/createActivity';
    }, 2000);

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
    var pic = getS3Photo(marker.obj['_id']);
    $scope.currentMarker = marker;
    $scope.currentMarkerDes = {'description':marker.obj['description'],'name':marker.obj['name'] };
    // $scope.currentMarkerImg = marker.obj['photo'];
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

  var getS3Photo = function(id) {
    var url = 'https://s3-us-west-2.amazonaws.com/helenimages/eventImages/' + id + '.json';
    var headers = {'Content-Type':'application/json'};
    $http({method:'GET',url:url,headers:headers}).success(function(data){
      $scope.currentMarkerImg = data.pic;
      console.log(data.pic)
    }).error(function(data){
      alert('error',data);
    });
  };
  $scope.currentMarkerAddPerson = function() {
    debugger;
    console.log($scope);//$scope.currentMarkerTotal++;
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
