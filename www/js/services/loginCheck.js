angular.module('meetMeApp.service.loginCheck', [])
.factory('loginCheck', ['$http', '$q', function($http, $q){
  var d = $q.defer();
  return function(){
    $http.post('http://54.200.135.103:9000/login', {})
    .success(function(data) {
      d.resolve(data);
    }).error(function(err) {
      if(err) throw err;
    });
    return d.promise;
  };
}]);
