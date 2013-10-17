angular.module("meetMeApp.directive.createActivity", [])
  .directive('activityButton', function () {
    return {
      restrict: 'E',
      template: "<div class='activityButton' ng-click='saveActivity(activity)'>{{activity[0]}}</div>"
    };
  });
