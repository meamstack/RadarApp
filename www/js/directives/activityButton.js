angular.module("meetMeApp.directive.createActivity", [])
  .directive('activityButton', function () {
    return {
      restrict: 'E',
      template: "<div class='activityButton' ng-click='saveActivity(activity)'><img ng-src='{{activity[1]}}' />{{activity[0]}}</div>"
    };
  })
  .directive('pictureThumb', function() {
    return {
      restrict: 'A',
      template: "<div ng-show='picData' class='pictureSaved'><img ng-src='{{picData}}' /></div>",
      // link: function (scope, element, attrs) {
      //   scope.$watch(attrs.degrees, function (rotateDegrees) {
      //     console.log(rotateDegrees);
      //     var r = 'rotate(' + rotateDegrees + 'deg)';
      //     element.css({
      //       '-moz-transform': r,
      //       '-webkit-transform': r,
      //       '-o-transform': r,
      //       '-ms-transform': r
      //    });
      //   });
      // }
    };
  })
  .directive('ngBlur', function() {
    return function( scope, elem, attrs ) {
      elem.bind('blur', function() {
        scope.$apply(attrs.ngBlur);
      });
    };
  });