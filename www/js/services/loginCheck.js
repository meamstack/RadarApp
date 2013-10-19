angular.module('meetMeApp.service.loginCheck', [])
.factory('loginCheck', ['$http', '$q', function($http, $q){
  var d = $q.defer();
  return function(){
    $http.post('http://myradar.co/login', {})
    .success(function(data) {
      d.resolve(data);
    }).error(function(err) {
      if(err) throw err;
    });
    return d.promise;
  };
}]);
