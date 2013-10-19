angular.module("meetMeApp.service.postToServer", [])
  .factory('postToServer', ['$http', function ($http) {
    var urlPath = 'http://myradar.co';
<<<<<<< HEAD
=======

>>>>>>> 74b0bc99dc8cf61cdb41463b08825849f4c2c1aa
    var send = function(options, cb) {
      options = JSON.stringify(options);
      $http.post(urlPath + '/api/createEvent', options)
        .success(function(data) {
          cb();
      }).error(function(error){
        alert('error',error);
      });
    };
<<<<<<< HEAD
    return {
      send: send
    };
=======

    return {send: send};
>>>>>>> 74b0bc99dc8cf61cdb41463b08825849f4c2c1aa
  }]);
