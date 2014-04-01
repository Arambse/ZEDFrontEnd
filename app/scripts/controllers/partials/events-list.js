angular.module('ZedApp')
  .controller('EventsListCtrl', ['$scope', '$state', '$location', 'Events', 'User', 'Shifts', 'DATE_FILTER_CHANGED', 'TIME_FILTER_CHANGED',
   function ($scope, $state, $location, Events, User, Shifts, DATE_FILTER_CHANGED, TIME_FILTER_CHANGED) {
 
    $scope.statusFilter = $state.current.data.statusFilter;

	//Methods
    $scope.initEvents = function(){
	    var today = '28/12/2013';
	    var warnOnCollisions = true;
	    var warnOnLateOrOpen =false;

    	var eventsPromise = Events.getEvents(today, warnOnCollisions, warnOnLateOrOpen);

	    eventsPromise.then(function (response, status, headers) {
	        console.log('Successfully Fetched Events');
	        $scope.isLoading = false;
			//Have no idea why upper object is d
			var eventsJSON = JSON.parse(response['d']);
	        $scope.events = eventsJSON.events;
	        $scope.collisions = eventsJSON.collisions;
	      }, function (error) {
	        console.log('Error in fetching Events');
	        $scope.isLoading = false;
	      })
    	};

    //Event Listening
    $scope.$on('$stateChangeStart', function(event, toState){ 
	    $scope.statusFilter = toState.data.statusFilter;
	    console.log('status filter for state is ' + $scope.statusFilter);
	});
	//Date and Time filters changed
	$scope.$on(DATE_FILTER_CHANGED, function(event, args) {
		console.log('Date Filter changed received broadcast');
	});
	$scope.$on(TIME_FILTER_CHANGED, function(event, args) {
		console.log('Time Filter changed received broadcast');
	});

	//Run Code
    $scope.initEvents();
}]);