var iPhoneApp = angular.module('meetMeApp', [
  'meetMeApp.controller.main',
  'meetMeApp.controller.map',
  'meetMeApp.controller.chat',
  'ajoslin.mobile-navigate',
  'meetMeApp.controller.createActivity',
  'meetMeApp.controller.viewActivity',
  'meetMeApp.directive.createActivity',
  'meetMeApp.service.eventLocation',
  'google-map-service',
  'meetMeApp.service.postToServer',
  'meetMeApp.service.userData'
]);
