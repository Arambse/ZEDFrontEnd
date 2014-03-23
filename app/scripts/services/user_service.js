angular.module('ZedApp').service('User',
  [function() {

    var username = null;
    var sessionID = null;

    this.updateUserDetailes = function(username, sessionID) {
      this.username = username;
      this.sessionID = sessionID;
	  console.log('updated username ' + username + ' with sessionID ' + sessionID);
      this.notifyObservers(this.sessionID);
    };


	//Obvserving for token
    var observerCallbacks = [];

    this.registerObserverCallback = function(callback) {
	  observerCallbacks.push(callback);
    };

	this.notifyObservers = function(authToken) {
	  console.log('User notified observers of token update with token ' + authToken);
	  angular.forEach(observerCallbacks, function(callback){
	    callback(authToken);
	  });
	};


  }]);