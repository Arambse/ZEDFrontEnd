angular.module('ZedApp')
  .controller('MapCtrl', ['$scope', '$state', '$q', '$http', 'Events', 'User',
   function ($scope, $state, $q, $http, Events, User) {
    
  $scope.getEvents = function () {
  
    $scope.isLoading = true;

    var startTime = '10:15';
    var endTime = '21:15';
    var today = '22/03/2014';
    var warnOnCollisions = true;
    var warnOnLateOrOpen =false;

    var eventsPromise = Events.getEvents(today, startTime, endTime, warnOnCollisions, warnOnLateOrOpen);

    eventsPromise.then(function (response, status, headers) {
        console.log('Successfully Fetched Events');
        $scope.isLoading = false;
      }, function (error) {
        console.log('Error in fetching Events');
        $scope.isLoading = false;
      })
    };
    
  }]);
