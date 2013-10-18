var iPhoneApp = angular.module('meetMeApp', [
  'meetMeApp.controller.main',
  'meetMeApp.controller.map',
  'meetMeApp.service.eventLocation',
  'meetMeApp.service.postToServer',
  'ajoslin.mobile-navigate',
  'meetMeApp.controller.createActivity',
  'meetMeApp.directive.createActivity',
  'google-map-service',
  'meetMeApp.service.userData',
  'meetMeApp.service.loginCheck',
  'hammer'
]);
