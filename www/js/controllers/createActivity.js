angular.module('meetMeApp.controller.createActivity', [])
  .controller('CreateActivityCtrl', ['$scope', function ($scope) {
    $scope.server = 'http://54.200';
    $scope.activities = ['coffee', 'dog walk', 'holding baby'];

    $scope.saveActivity = function(activity) {
      $scope.activity = activity;
      console.log($scope.activity);
    };

    $scope.openDate = function() {
      alert('dating');
      try {
        var datePicker = cordova.require("cordova/plugin/datepicker");
        var options =  {
          date: new Date(),
          mode: 'date',
          allowOldValues:    true,
          allowFutureValues: true,
          visibility: 'auto',
          onChange: function (date) {
            // on datepicker value change
          },
          onDismiss: function (date) {
            // on datepicker dismiss
          },
          onPrev: function () {
            // on datepicker action sheet previous button clicked
          },
          onNext: function () {
            // on datepicker action sheet next button clicked
          }
        };
        datePicker.show(options);
      } catch(error) {
        console.log(error);
      }
    };

  }]);
