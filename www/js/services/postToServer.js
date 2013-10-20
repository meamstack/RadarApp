angular.module("meetMeApp.service.postToServer", [])
  .factory('postToServer', ['$http', function ($http) {
    var urlPath = 'http://myradar.co';
    var send = function(options, cb) {
      options = JSON.stringify(options);
      $http.post(urlPath + '/api/createEvent', options)
        .success(function(data) {
          cb();
      }).error(function(error){
        alert('error',error);
      });
    };
    return {send: send};
  }]);
