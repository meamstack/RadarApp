angular.module('meetMeApp.controller.createActivity', [])
  .controller('CreateActivityCtrl', ['$scope', 'googleMapLatLon', 'postToServer', '$location', 'userData', '$navigate', function ($scope, googleMapLatLon, postToServer, $location, userData, $navigate) {

    $scope.createActivityUser = userData.getUser();
    $scope.userID = $scope.createActivityUser._id;
    $scope.latlon = googleMapLatLon.get();
    $scope.$navigate = $navigate;
    $scope.submitForm = function () {
      var date = angular.element('#eventDate');
      postToServer.send({
        name: $scope.eventName,
        description: $scope.description,
        time: date[0].value,
        photo: $scope.picData,
        activity: $scope.activity,
        location: $scope.latlon,
        userId: $scope.userID
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
        location: googleMapLatLon.get()
      });
      postToServer.savePic($scope.picData);
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
