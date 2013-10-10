iPhoneApp.config(['$routeProvider',
  function ($routeProvider) {
    $routeProvider
    .when('/', {
      templateUrl: 'views/main.html',
      controller: 'MainCtrl'
    })
    .when('/map', {
      templateUrl: 'views/map.html',
      controller: 'MapCtrl'
    })
    .when('/createActivity', {
      templateUrl: 'views/createActivity.html',
      controller: 'CreateActivityCtrl'
    })
    .when('/viewActivity', {
      templateUrl: 'views/viewActivity.html',
      controller: 'ViewActivityCtrl'
    })
    .when('/chat', {
      templateUrl: 'views/chat.html',
      controller: 'ChatCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });
  }
]);


//Setting HTML5 Location Mode
// window.iPhoneApp.config(['$locationProvider',
//     function($locationProvider) {
//         $locationProvider.hashPrefix("!");
//     }
// ]);