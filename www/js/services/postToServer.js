angular.module("meetMeApp.service.postToServer", [])
  .factory('postToServer', ['$http', function ($http) {
    var picData = null;
    var eventName = null;
    var description = null;
    var urlPath = 'http://52.200.135.103:9000';
    // var urlPath = 'http://localhost:3000';


    var send = function(options, cb) {
      options = JSON.stringify(options);
      $http.post(urlPath + '/api/createEvent', options)
        .success(function(data) {
          console.log('successful creating to server',data);
          cb();
      }).error(function(error){
        alert('error',error);
      });
    };

    var savePic = function(pic) {
      picData = pic;
    };

    var getPic = function() {
      return picData;
    };

    var saveName = function(name) {
      eventName = name;
    };

    var getName = function() {
      return eventName;
    };

    var saveDesc = function(desc) {
      description = desc;
    };

    var getDesc = function() {
      return description;
    };



    return {
      send: send,
      savePic: savePic,
      getPic: getPic,
      saveName: saveName,
      getName: getName,
      saveDesc: saveDesc,
      getDesc: getDesc
    };
  }]);
