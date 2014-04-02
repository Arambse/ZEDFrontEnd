angular.module('ZedApp.Services', [])
  .service('Shifts', ['ShiftsTimes', function(ShiftsTimes) {

	this.shiftsMinutes = function() {
		return ['0', '15', '30', '45'];
	}
	
  	this.shifts = function() {
	  return shiftsEnum = {
	    Morning: { identifierCode: '1', times: ShiftsTimes.morningTimes() , englishName: 'Morning', hebrewName: 'בוקר'},
	    Noon: { identifierCode: '2', times: ShiftsTimes.noonTimes(), englishName: 'Noon', hebrewName: 'צהריים'},
	    Evening: { identifierCode: '3', times: ShiftsTimes.eveningTimes() , englishName: 'Evening', hebrewName: 'ערב'},
	   }
  	}


}]);