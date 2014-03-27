angular.module('ZedApp')
  .controller('EventsListCtrl', ['$scope', '$state', '$location', 'Events', 'User', 'GuestStatuses',
   function ($scope, $state, $location, Events, User, GuestStatuses) {


	//Data and Filters
	$scope.friends = [
					 {name:'John', phone:'555-1276', status:'100', expanded: false},
                     {name:'Mary', phone:'800-BIG-MARY', status:'20', expanded: false},
                     {name:'Mike', phone:'555-4321', status:'30', expanded: false},
                     {name:'Adam', phone:'555-5678', status:'50', expanded: false},
                     {name:'Julie', phone:'555-8765', status:'8', expanded: false},
                     {name:'Juliette', phone:'555-5678', status:'10', expanded: false}
                     ];

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