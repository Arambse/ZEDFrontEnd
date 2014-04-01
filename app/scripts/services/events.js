angular.module('ZedApp').service('Events',
  ['$http', '$window', '$q', 'User', 'SERVER_URL', 'GET_EVENTS_URL',
    function($http, $window, $q, User, SERVER_URL, GET_EVENTS_URL) {
      
      var events = null;
      var collisions = null;

      this.getEvents = function(date, warnOnCollisions, warnOnLateOrOpen ) {
      
        var startTime = '06:00';
        var endTime = '02:00';
        
        console.log("getting events for: " + date + ", " + startTime + ", " + endTime);
        console.log('for user ' +  User.username + ' with session id ' + User.sessionID);
        
        var eventsRequestUrl = SERVER_URL + GET_EVENTS_URL;
          var headers = {
            'Content-Type': 'application/json; charset=utf-8',
            'sessionID': User.sessionID
          };

        var deferred = $q.defer();

        $http.post(eventsRequestUrl, { StartTime: startTime, EndTime: endTime, DateSTR: date, WarnOnCollisions: warnOnCollisions, WarnOnLateOrOpen: warnOnLateOrOpen},
          {headers: headers})
          .success(function(data) {
            console.log(data);
            var eventsJSON = JSON.parse(data['d']);
            events = eventsJSON.events;
            collisions = eventsJSON.collisions;
            deferred.resolve({events: events, collisions: collisions });
          })
          .error(function(data) {
            console.error(data);
            deferred.reject(data);
          });

        return deferred.promise;
      };

}]);
