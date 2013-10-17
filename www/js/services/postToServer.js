angular.module("meetMeApp.service.postToServer", [])
  .factory('postToServer', ['$http', function ($http) {
    var picData = null;
    var eventName = null;
    var description = null;
    var urlPath = 'http://myradar.co';


    var send = function(options, cb) {
      options = JSON.stringify(options);
      $http.post(urlPath + '/api/createEvent', options)
        .success(function(data) {
          // alert('successful creating to server',data);
          cb();
      }).error(function(error){
        alert('error',error);
      });
    };

    var savePic = function(pic) {
      $http.post(urlPath + '/api/addPhoto', pic)
        .success(function(data) {
          console.log('successful photo save to server');
      }).error(function(error){
        alert('error',error);
        console.log('errrrrr', error);
      });
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
