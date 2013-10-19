iPhoneApp.config(['$routeProvider',
  function ($routeProvider) {
    $routeProvider
    .when('/', {
      templateUrl: 'views/main.html',
      controller: 'MainCtrl'
    })
    .when('/main', {
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
    .when('/walkthrough', {
      templateUrl: 'views/walkthrough.html',
      controller: 'MainCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });
  }
])
.config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
  }
])
.run(['loginCheck', '$location', '$http', function(loginCheck, $location, $http) {
    var promise = loginCheck();
    promise.then(function(credential) {
      console.log(credential);
      if(credential === 'true') {
        $location.path('/map');
      } else {
        $location.path('/');
      }
    });
  }
]);


//Setting HTML5 Location Mode
// window.iPhoneApp.config(['$locationProvider',
//     function($locationProvider) {
//         $locationProvider.hashPrefix("!");
//     }
// ]);
