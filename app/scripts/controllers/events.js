angular.module('ZedApp')
  .controller('EventsCtrl', ['$scope', '$state', '$q', '$http', 'Events', 'User',
    function ($scope, $state, $q, $http, Events, User) {
      
      $scope.getEvents = function () {
        $scope.isLoading = true;

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
