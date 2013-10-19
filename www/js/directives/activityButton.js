angular.module("meetMeApp.directive.createActivity", [])
  .directive('activityButton', [function () {
    return {
      restrict: 'E',
      template: "<div class='activityButton' ng-click='saveActivity(activity)'>{{activity[0]}}</div>"
    };
  }]).directive('ngFocus', ['$parse', function($parse) {
  return function(scope, element, attr) {
    var fn = $parse(attr['ngFocus']);
    element.bind('focus', function(event) {
      scope.$apply(function() {
        fn(scope, {$event:event});
      });
    });
  }
}]);
