angular.module('ZedApp').service('User',
  [
  function() {

    var username = null;
    var sessionID = null;

    this.updateUserDetailes = function(username, sessionID) {
      this.username = username;
      this.sessionID = sessionID;
    }

  }]);