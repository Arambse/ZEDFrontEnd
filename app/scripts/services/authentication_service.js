angular.module('ZedApp').service('Authentication',
  ['$http','$state', '$q', 'SERVER_URL', 'LOGIN_URL','GET_EVENTS_URL',
    function($http, $state, $q, SERVER_URL, LOGIN_URL, GET_EVENTS_URL) {

      var isAuthenticated = false;

      this.login = function(username, password) {

        var loginRequestUrl = SERVER_URL + LOGIN_URL;
        var requestHeaders = {
            'Content-type': 'application/json; charset=utf-8'
          };
        var params = {
          username: 'rami',
          password: '1234'
        };

        var deferred = $q.defer();

        $http({method: 'GET', url: loginRequestUrl, headers:requestHeaders, params: params})
          .success(function (response) {
            console.log();
            // User.setUserDetails(email, response.d);
            deferred.resolve(response);
          }).error(function (data) {
            console.log(data);
            deferred.reject(data);
          });

        return deferred.promise;
      };

    }]);