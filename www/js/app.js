var iPhoneApp = angular.module('meetMeApp', [
  'meetMeApp.controller.main',
  'meetMeApp.controller.map',
  'meetMeApp.controller.chat',
  'ajoslin.mobile-navigate',
  'meetMeApp.controller.createActivity',
  'meetMeApp.controller.viewActivity',
  'google-map-service',
  'meetMeApp.directive.createActivity'
]);
