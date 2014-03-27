angular.module('ZedApp')
  .controller('EventsListCtrl', ['$scope', '$state', '$location', 'Events', 'User', 'GuestStatuses',
   function ($scope, $state, $location, Events, User, GuestStatuses) {


	//Data and Filters
	$scope.friends = [
					 {name:'John', phone:'555-1276', status:'100'},
                     {name:'Mary', phone:'800-BIG-MARY', status:'20'},
                     {name:'Mike', phone:'555-4321', status:'30'},
                     {name:'Adam', phone:'555-5678', status:'50'},
                     {name:'Julie', phone:'555-8765', status:'8'},
                     {name:'Juliette', phone:'555-5678', status:'10'}
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
	jQuery('#date-picker').datepicker();



	//Methods
    $scope.initEvents = function(){
    	if (!$scope.Events) {
    		var startTime = '10:15';
		    var endTime = '21:15';
		    var today = '22/03/2014';
		    var warnOnCollisions = true;
		    var warnOnLateOrOpen =false;

        	$scope.events = Events.getEvents(today, startTime, endTime, warnOnCollisions, warnOnLateOrOpen);
    	}    		  
    };

    $scope.tabClicked = function(tabName) {
    	console.log('tab clicked with name ' + tabName);
    	switch (tabName){
			case GuestStatuses.All.englishName: {
				$state.go('user.events.main.all');
				console.log('All');
				break;
			}
			case GuestStatuses.Sitting.englishName: {
				$state.go('user.events.main.sitting');
				console.log('Sitting');
				break;
			}
			case GuestStatuses.Ordered.englishName: {
				$state.go('user.events.main.ordered');
				console.log('Ordered');
				break;
			}
			case GuestStatuses.Occasional.englishName: {
				$state.go('user.events.main.occasional');
				console.log('Occasional');
				break;
			}
			//Alarms
			default: {
				$state.go('user.events.main.alarms');
				console.log('default');
			}
    	}
    };

    //Event Listening
    $scope.$on('$stateChangeStart', function(event, toState){ 
	    $scope.statusFilter = toState.data.statusFilter;
	    console.log('status filter for state is ' + $scope.statusFilter);
	});

	//Run Code
    $scope.initEvents();
}]);