angular.module('ZedApp')
  .controller('LoginCtrl', ['$scope', '$state', 'Authentication',
   function ($scope, $state, Authentication) {
  
  $scope.isLoading = false;
  $scope.isAuthenticated = false;
  $scope.loginError = null;

  $scope.login = function () {
  	
  	$scope.isLoading = true;

  	var authenticationPromise = Authentication.login($scope.username, $scope.password);

  	authenticationPromise.then(function (response, status, headers) {
  		console.log('Successful login');
  		$scope.isLoading = false;
  		$scope.isAuthenticated = true;
  		$state.transitionTo('user.events.main');
    	}, function (error) {
  		console.log('Error in login');
    		$scope.isLoading = false;
    		$scope.loginError = error;
    	})
    };

  }]);
