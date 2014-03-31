angular.module('ZedApp')
  .controller('EventsListCtrl', ['$scope', '$state', '$location', 'Events', 'User',
   function ($scope, $state, $location, Events, User) {

    $scope.statusFilter = null;

    //Time picker
    jQuery('#time-picker').timepicker({
       defaultTime: 'current',
	    minuteStep: 15,
	    showMeridian: false,
	    showWidget: true,
	    disableFocus: true,
	    template: 'dropdown'
	});
	//Date Picker
	jQuery('#date-picker').datepicker();

	//Methods
    $scope.initEvents = function(){
		var startTime = '10:15';
	    var endTime = '21:15';
	    var today = '28/12/2013';
	    var warnOnCollisions = true;
	    var warnOnLateOrOpen =false;

    	var eventsPromise = Events.getEvents(today, startTime, endTime, warnOnCollisions, warnOnLateOrOpen);
	
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

	//Run Code
    $scope.initEvents();
}]);