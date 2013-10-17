angular.module("meetMeApp.service.userData", [])
  .factory('userData', ['$http', '$q', function ($http, $q) {

    var user;
    var init = function() {
	    var deferred = $q.defer();
	    
      $http.get('http://myradar.co/api/getUserData')
	    .success(function(userData, status, headers, config) {
	    	user = userData;
	      deferred.resolve(userData);
	    }).error(function(err, status, headers, config) {if(err) throw err;});
	    return deferred.promise;
	  };

    return {
      init: init,
      getUser: function(){
        return user;
      }
    };
  }]);
