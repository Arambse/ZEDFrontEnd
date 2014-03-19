angular.module('ZedApp')
  .controller('EventsCtrl', ['$scope', '$state', '$q', '$http', 'User', 'SESSION_TOKEN_KEY', 'SERVER_URL', 'GET_EVENTS_URL',
   function ($scope, $state, $q, $http, User, SESSION_TOKEN_KEY, SERVER_URL, GET_EVENTS_URL) {
    
    $scope.getEvents = function() {
        
        $scope.isLoading = true;

        var eventsRequestUrl = SERVER_URL + GET_EVENTS_URL;
        console.log(eventsRequestUrl);
        var requestHeaders = {
            'Content-type': 'application/json; charset=utf-8', 'sessionID': User.sessionID
          };
        var params = { StartTime: startTime, EndTime: endTime, DateSTR: date };

        var deferred = $q.defer();
        console.log('starting events request');

        $http({method: 'POST', url: eventsRequestUrl, headers:requestHeaders, params: params})
          .success(function (response, status, headers) {
            console.log(response);
            deferred.resolve(response);

          }).error(function (data) {
            console.log(data);
            deferred.reject(data);
          });

        return deferred.promise;
      }

      $scope.getEvents();
      
  }]);
