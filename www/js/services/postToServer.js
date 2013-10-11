angular.module("meetMeApp.service.postToServer", [])
  .factory('postToServer', ['$http', function ($http) {
    return function(options) {
      options = JSON.stringify(options);
      $http.post('http://54.200.135.103:9000/api/createEvent', options)
        .success(function(data) {
          alert('success', data)
          console.log('successful creating to server',data);
      }).error(function(error){
        alert('error',error);
      });
    };
  }]);
