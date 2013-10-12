angular.module('meetMeApp.controller.chat', [])
  .controller('ChatCtrl', ['$scope', 'userData', function ($scope, userData) {
  	$scope.user = userData.getUser();
  }]);
