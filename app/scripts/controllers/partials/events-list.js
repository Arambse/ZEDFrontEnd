angular.module('ZedApp')
  .controller('EventsListCtrl', ['$scope', '$state', '$location', 'Events', 'User', 'Shifts', 'DATE_FILTER_CHANGED', 'TIME_FILTER_CHANGED', 'SHIFT_FILTER_CHANGED',
   function ($scope, $state, $location, Events, User, Shifts, DATE_FILTER_CHANGED, TIME_FILTER_CHANGED, SHIFT_FILTER_CHANGED) {
 
    $scope.statusFilter = $state.current.data.statusFilter;

	//Methods
    $scope.getEvents = function(){
	    
	    var today = '28/12/2013';
	    var warnOnCollisions = true;
	    var warnOnLateOrOpen =false;

    	var eventsPromise = Events.getEvents(today, warnOnCollisions, warnOnLateOrOpen);

	    eventsPromise.then(function (data, status, headers) {
	        console.log('Successfully Fetched Events');
	        $scope.isLoading = false;
	        $scope.events = data.events;
	        $scope.collisions = data.collisions;
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

	//Date, Time and Shift filters changed
	$scope.$on(DATE_FILTER_CHANGED, function(event, args) {
		// $scope.getEvents();
	});
	$scope.$on(TIME_FILTER_CHANGED, function(event, args) {
		$scope.currentTime = args;
	});
	$scope.$on(SHIFT_FILTER_CHANGED, function(event, args) {
		$scope.currentShift = args;
	});

	//Run Code
    $scope.getEvents();

}]);