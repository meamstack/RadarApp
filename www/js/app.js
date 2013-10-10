var iPhoneApp = angular.module('meetMeApp', [
  'meetMeApp.controller.main',
  'meetMeApp.controller.map',
  'meetMeApp.controller.chat',
  'ajoslin.mobile-navigate',
  'meetMeApp.controller.createActivity',
  'meetMeApp.controller.viewActivity',
  'meetMeApp.directive.createActivity',
  'google-map-service'
]);
