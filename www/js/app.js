var iPhoneApp = angular.module('meetMeApp', [
  'meetMeApp.controller.main',
  'meetMeApp.controller.map',
  'meetMeApp.controller.createActivity',
  'meetMeApp.directive.createActivity',
  'meetMeApp.service.eventLocation',
  'meetMeApp.service.postToServer',
  'meetMeApp.service.userData',
  'meetMeApp.service.loginCheck',
  'ajoslin.mobile-navigate',
  'ui.map',
  'ngCookies',
  'hammer'
]);
