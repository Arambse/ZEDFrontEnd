angular.module('ZedApp.Services', [])
	.service('Shifts', ['$q', '$http', 'ShiftsTimes','SERVER_URL', 'GET_SINGLE_DAY_URL', 
    function($q, $http, ShiftsTimes, SERVER_URL, GET_SINGLE_DAY_URL) {

			this.shiftsMinutes = function() {
				return ['00', '15', '30', '45'];
			}

	  	this.shifts = function() {
			  return shiftsEnum = {
			    Morning: { identifierCode: '1', times: ShiftsTimes.morningTimes() , englishName: 'Morning', hebrewName: 'בוקר'},
			    Noon: { identifierCode: '2', times: ShiftsTimes.noonTimes(), englishName: 'Noon', hebrewName: 'צהריים'},
			    Evening: { identifierCode: '3', times: ShiftsTimes.eveningTimes() , englishName: 'Evening', hebrewName: 'ערב'},
			   };
	  	}

      this.getDay = function(date) {
        var singleDayUrl = SERVER_URL + GET_SINGLE_DAY_URL;
        var headers = {
          'Content-Type': 'application/json; charset=utf-8',
      };

      var deferred = $q.defer();
      
      $http.post(singleDayUrl, { dateSTR: date }, {headers: headers})
        .success(function(data) {
          console.log(data);
          deferred.resolve(data);
        })
        .error(function(data) {
          console.error(data);
          deferred.reject(data);
        });

	      return deferred.promise;
			}
}]);