angular.module('ZedApp').service('Authentication',
  ['$http','$state', '$q', 'localStorageService', 'User', 'SERVER_URL', 'LOGIN_URL',
    function($http, $state, $q, localStorageService, User, SERVER_URL, LOGIN_URL) {

      var isAuthenticated = false;

      this.login = function(username, password) {

        console.log('Logging in for ' + username + ' with Pass ' + password);
        var loginRequestUrl = SERVER_URL + LOGIN_URL;
        var requestHeaders = {
            'Authorization': 'Basic ' + btoa(username+':'+password),
            'Content-type': 'application/json; charset=utf-8'
          };

        var deferred = $q.defer();

        $http({method: 'POST', url: loginRequestUrl, headers:requestHeaders, data:""})
          .success(function (response, status, headers) {
            console.log(response);
            deferred.resolve(response);
          }).error(function (data) {
            console.log(data);
            deferred.reject(data);
          });

        return deferred.promise;
      };

      this.retrieveAuthToken = function() {
        var authToken = localStorageService.get('zedAuthToken');
        console.log('retrieved AuthToken ' + authToken);
        return authToken;
      };

      var updateAuthHeader = function(headerValue) {
        $http.defaults.headers.common.sessionID = headerValue;
        console.log('updated sessionID Header with token ' + headerValue);
      };

      User.registerObserverCallback(updateAuthHeader);
      
    }]);