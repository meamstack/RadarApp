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

    var initializeInfo = function() {   // initialize information, called at bottom of page
      $scope.activities = [ ['coffee','a.png'],
                            ['park','b.png'],
                            ['holding baby','img/glyphicons/png/glyphicons_075_stroller.png'],
                            ['bar', 'c.png'],
                            ['reading', 'd.png'],
                            ['sports', 'e.png'],
                            ['music', 'f.png'],
                            ['...', 'more.png']];
      $scope.picData = postToServer.getPic();
      $scope.eventName = postToServer.getName();
      $scope.description = postToServer.getDesc();
      $scope.date = '10/12/13 12:10:20';
      $scope.picData = 'img/test_img.jpg';
    };

    $scope.showOptions = function () {
      
    }

    $scope.saveActivity = function(activity) {
      $scope.activity = activity;
    };

    $scope.saveName = function() {
      alert('save name');
      postToServer.saveName($scope.eventName);
    };

    $scope.saveDesc = function() {
      alert('saved desc');
      postToServer.saveDesc($scope.description);
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

    $scope.saveDate = function() {
      var date = angular.element('#eventDate');
      console.log(date[0].value);
      $scope.date = date[0].value;
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
      // Take picture using device camera and retrieve image as base64-encoded string
      console.log(navigator);
      navigator.camera.getPicture(onSuccess,onFail,options);
    };

    $scope.openPhotoLib = function() {
      var options = {
          quality: 14,
          destinationType: 0,
          sourceType: 0,      // 0:Photo Library, 1=Camera, 2=Saved Photo Album
          allowEdit: true,
          encodingType: 0     // 0=JPG 1=PNG
      };
      // Take picture using device camera and retrieve image as base64-encoded string
      console.log(navigator);
      navigator.camera.getPicture(onSuccess,onFail,options);
    };

    var onSuccess = function(imageData) {
      $scope.picData = "  data:image/jpeg;base64," +imageData;
      $scope.$apply();
    };
    var onFail = function(e) {
      console.log("On fail " + e);
      // alert('err', e);
    };

    initializeInfo();

  }]);
