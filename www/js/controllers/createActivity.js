angular.module('meetMeApp.controller.createActivity', [])
  .controller('CreateActivityCtrl', ['$scope', function ($scope) {
    $scope.server = 'http://54.200';
    $scope.activities = ['coffee', 'dog walk', 'holding baby'];
    $scope.picData = '../../img/test_img.jpg';

    $scope.saveActivity = function(activity) {
      $scope.activity = activity;
      console.log($scope.activity);
      alert($scope.activity);
    };

    $scope.saveDate = function() {
      var date = angular.element('#eventDate');
      console.log(date[0].value);
      alert(date[0].value);
      $scope.date = date[0].value;
    };

    $scope.takePic = function() {
      var options = {
          quality: 50,
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
          quality: 50,
          destinationType: Camera.DestinationType.DATA_URL,
          sourceType: 0,      // 0:Photo Library, 1=Camera, 2=Saved Photo Album
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

  }]);
