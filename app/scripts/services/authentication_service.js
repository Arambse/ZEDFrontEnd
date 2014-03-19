angular.module('ZedApp').service('Authentication',
  ['$http','$state', '$q', 'User', 'SERVER_URL', 'LOGIN_URL',
    function($http, $state, $q, User, SERVER_URL, LOGIN_URL) {

      var isAuthenticated = false;

      this.login = function(username, password) {
      // $http.defaults.withCredentials = true;

        var loginRequestUrl = SERVER_URL + LOGIN_URL;
        var requestHeaders = {
            'Content-type': 'application/json; charset=utf-8',
            'Authorization': 'Basic ' + btoa(username+':'+password),
          };
        var params = { username: 'rami', password: '1234' };
        var config = { withCredentials: true };

        var deferred = $q.defer();

        $http({method: 'POST', url: loginRequestUrl, headers:requestHeaders, config: config})
          .success(function (response, status, headers) {
            console.log(response);
            //Fix ME
            var startIndex = response.indexOf('{"username":"');
            var endIndex = response.indexOf('</string>');
            var jsonString = response.slice(startIndex, endIndex);
            var jsonObject = JSON.parse(jsonString);

            User.updateUserDetailes(jsonObject['username'], jsonObject['sessionID']);

            deferred.resolve(response);

          }).error(function (data) {
            console.log(data);
            deferred.reject(data);
          });

        return deferred.promise;
      };

    }]);