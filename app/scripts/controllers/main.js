angular.module('ZedApp')
  .controller('MainCtrl', ['$scope', '$state', 'User', 'Authentication',
   function ($scope, $state, User, Authentication) {
	  
	  // User.sessionID = Authentication.retrieveAuthToken();
	  if (User.sessionID) {
	  	  $state.go('user.events.main.all');
	  } else {
		  $state.go('anonymous.login'); 
	  }
  }]);
