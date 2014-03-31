angular.module('ZedApp')
  .controller('LoginCtrl', ['$scope', '$state', 'localStorageService', 'User', 'Authentication',
   function ($scope, $state, localStorageService, User, Authentication) {
  
  $scope.isLoading = false;
  $scope.isAuthenticated = false;
  $scope.loginError = null;

  $scope.login = function() {
  	
  	$scope.isLoading = true;

  	var authenticationPromise = Authentication.login($scope.username, $scope.password);

  	authenticationPromise.then(function (response, status, headers) {
    		console.log('Successful login');
        User.updateUserDetailes($scope.username, response['d']);
        localStorageService.add('zedAuthToken', User.sessionID);
    		$scope.isLoading = false;
    		$scope.isAuthenticated = true;
    		$state.go('user.events.main.all');
    	}, function (error) {
    		console.log('Error in login');
    		$scope.isLoading = false;
    		$scope.loginError = error;
    	})
    };

    $scope.hasErrors = function() {
      return ($scope.loginError);
    };

  }]);
