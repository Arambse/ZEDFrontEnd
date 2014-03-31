angular.module('ZedApp.Services', [])
  .service('Shifts', ['ShiftsTimes', function(ShiftsTimes) {

  return shiftsEnum = {
    Morning: { identifierCode: '1', times: ShiftsTimes.morningTimes() , englishName: 'Morning', hebrewName: 'בוקר'},
    Noon: { identifierCode: '2', times: ShiftsTimes.noonTimes(), englishName: 'Noon', hebrewName: 'צהריים'},
    Evening: { identifierCode: '3', times: ShiftsTimes.eveningTimes() , englishName: 'Evening', hebrewName: 'ערב'},
   }

}]);