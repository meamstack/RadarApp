angular.module('meetMeApp.controller.createActivity', [])
  .controller('CreateActivityCtrl', ['$scope', 'googleMapLatLon', 'postToServer', '$location', 'userData', '$navigate', function ($scope, googleMapLatLon, postToServer, $location, userData, $navigate) {
// <<<<<<< HEAD
//     $scope.createActivityUser = userData.getUser();
//     console.log($scope.createActivityUser);
//     console.log(googleMapLatLon);
//     //$scope.userID = $scope.createActivityUser._id;
//     $scope.latlon = googleMapLatLon.get();
// =======

    var init = function() {
      // $scope.createActivityUser = userData.getUser();
      // $scope.userID = $scope.createActivityUser._id;
      $scope.showDateTime = true;
      $scope.$navigate = $navigate;
      var currentDate = new Date();
      $scope.date = (currentDate.getMonth()+1)  + "/" 
                + currentDate.getDate() + "/"
                + currentDate.getFullYear() + " @ "  
                + currentDate.getHours() + ":"  
                + currentDate.getMinutes() + ":" 
                + currentDate.getSeconds(); 
      $scope.picData = 'img/photoPlaceholder.png';
      document.getElementById('eventDate').value = new Date().toISOString().substring(0, 10);
      var hour = new Date().getHours();
      var min = new Date().getMinutes();
      document.getElementById('eventTime').value = hour+':'+min
    };

    init();

    $scope.submitForm = function () {
      var date = document.getElementById('eventDate').value;
      var time = document.getElementById('eventTime').value;
      postToServer.send({
        name: $scope.eventName,
        description: $scope.description,
        time: date + ' ' + time,
        photo: $scope.picData,
        location: [lat, lng]//$scope.latlon,
        //userId: $scope.userID || 123
      }, function(){
        $scope.$navigate.go('/map', 'slide');
      });
    };

    $scope.saveToServer = function() {
      var date = angular.element('#eventDate');
      $scope.isDisabled = true;
      postToServer.send({
        name: $scope.eventName,
        description: $scope.description,
        time: date[0].value,
        photo: $scope.picData,
        activity: $scope.activity,
        _id: $scope.userId || 123, 
        location: googleMapLatLon.get()
      });
      postToServer.savePic($scope.picData);
    };

    $scope.showDate = function() {
      $scope.showDateTime = false;
      // angular.element('.dateTimeLocal').addClass('clear');
      // angular.element('#eventDate').removeClass('clear');
    };


    $scope.takePic = function() {
      var options = {
          quality: 14,        // on scale of 0 - 100. 100 being full quality
          destinationType: 0, // 0: Data_URL, 1: File_URI
          sourceType: 1,      // 0: Photo Library, 1: Camera, 2: Saved Photo Album
          encodingType: 0,    // 0: JPG, 1: PNG,
          allowEdit: true,
          mediaType: 0,        // 0: picture, 1: video, 2: all media,
          saveToPhotoAlbum: true
      };
      navigator.camera.getPicture(onSuccess,onFail,options);
    };

    $scope.openPhotoLib = function() {
      var options = {
          quality: 14,
          destinationType: 0,
          sourceType: 0,
          allowEdit: true,
          encodingType: 0
      };
      navigator.camera.getPicture(onSuccess,onFail,options);
    };

    var onSuccess = function(imageData) {
      $scope.picData = "  data:image/jpeg;base64," +imageData;
      $scope.$apply();
    };
    var onFail = function(e) {
      console.log("On fail " + e);
    };


  }]);
