var iPhoneApp = angular.module('meetMeApp', [
  'meetMeApp.controller.main',
  'meetMeApp.controller.map',
  'meetMeApp.controller.chat',
  'meetMeApp.service.eventLocation',
  'meetMeApp.service.postToServer',
  'ajoslin.mobile-navigate',
  'meetMeApp.controller.createActivity',
  'meetMeApp.controller.viewActivity',
  'meetMeApp.directive.createActivity',
  'meetMeApp.service.userData',
  'ui.map',
  'meetMeApp.service.loginCheck',
  'ngCookies',
  'hammer'
]);
