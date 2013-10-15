iPhoneApp.config(['$routeProvider',
  function ($routeProvider) {

    // TODO: work on going to map page automatically when logged in
    // var checkLoggedin = function($q, $timeout, $http, $location, $rootScope){
    //   // Initialize a new promise
    //   var deferred = $q.defer();

    //   // Make an AJAX call to check if the user is logged in
    //   $http.get('http://meetme123.com:3000/loggedin').success(function(user){
    //     // Authenticated
    //     if (user !== '0') {
    //       $timeout(deferred.resolve, 0);
    //     }
    //     // Not Authenticated
    //     else {
    //       $timeout(function(){deferred.reject();}, 0);
    //       $location.url('/main');
    //     }
    //   });
    //   return deferred.promise;
    // };

    $routeProvider
    .when('/', {
      templateUrl: 'views/main.html',
      controller: 'MainCtrl'
      // , resolve: {
      //   loggedin: checkLoggedin
      // }
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
    .otherwise({
      redirectTo: '/'
    });
  }
])
.config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
  }
]);


//Setting HTML5 Location Mode
// window.iPhoneApp.config(['$locationProvider',
//     function($locationProvider) {
//         $locationProvider.hashPrefix("!");
//     }
// ]);