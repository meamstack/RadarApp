angular.module("meetMeApp.directive.createActivity", [])
  .directive('activityButton', [ function () {
    return {
      Restrict: 'E',
      template: "<div class='activityButton' ng-click='saveActivity()'>Coffee</div>"
    };
  }]);