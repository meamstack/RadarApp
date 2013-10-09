var iPhoneApp = angular.module('meetMeApp', [
  'meetMeApp.controller.main',
  'meetMeApp.controller.map',
  'meetMeApp.controller.createActivity',
  // 'leaflet-directive',
  'google-map-service',
  'meetMeApp.directive.createActivity'
]);
