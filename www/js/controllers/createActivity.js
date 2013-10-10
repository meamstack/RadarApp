angular.module('meetMeApp.controller.createActivity', [])
  .controller('CreateActivityCtrl', ['$scope', function ($scope) {
    $scope.server = 'http://54.200';
    $scope.activities = ['coffee', 'dog walk', 'holding baby'];

    $scope.saveActivity = function(activity) {
      $scope.activity = activity;
      console.log($scope.activity);
      alert($scope.activity);
    };

    $scope.saveDate = function() {
      var date = angular.element('#eventDate');
      console.log(date[0].value);
      alert(date[0].value);
    };



    $scope.takePic = function() {
      alert('PHOTO');
      var options =   {
          quality: 50,
          destinationType: Camera.DestinationType.DATA_URL,
          sourceType: 1,      // 0:Photo Library, 1=Camera, 2=Saved Photo Album
          encodingType: 0     // 0=JPG 1=PNG
      };
      // Take picture using device camera and retrieve image as base64-encoded string
      console.log(navigator);
      navigator.camera.getPicture(onSuccess,onFail,options);
    };

    var onSuccess = function(imageData) {
      alert("On Success! ");
      $scope.picData = "  data:image/jpeg;base64," +imageData;
      $scope.$apply();
    };
    var onFail = function(e) {
      console.log("On fail " + e);
      alert('err', e);
    };

  }]);
