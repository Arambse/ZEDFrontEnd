angular.module('ZedApp')
  .controller('TimesCtrl', ['$scope', '$rootScope', '$state', '$q', '$http', 'Events', 'Shifts', 'DATE_FILTER_CHANGED', 'TIME_FILTER_CHANGED', 'SHIFT_FILTER_CHANGED',
    function ($scope, $rootScope, $state, $q, $http, Events, Shifts, DATE_FILTER_CHANGED, TIME_FILTER_CHANGED, SHIFT_FILTER_CHANGED) {

      $scope.shifts = Shifts;
      $scope.currentShift = Shifts['Morning'];
      $scope.currentTime = null;
      $scope.currentDate = moment().format('DD/MM/YY');

      //Date Picker
      jQuery('#date-picker').datepicker()
        .on('changeDate', function(ev) {
          var newDate = new Date(ev.date)
          currentDate = newDate;
          console.log('sdasdsadsasad' + currentDate);
        });

      //Broadcasting for filtering reasons
      $scope.$watch('currentTime', function(newValue, oldValue) {
        // if(newValue === oldValue) { return; };
        console.log('currentTime changed to ' + newValue + ', Broadcasting');
        $rootScope.$broadcast(TIME_FILTER_CHANGED, newValue);
      });

      $scope.$watch('currentDate', function(newValue, oldValue) {
        // if(newValue === oldValue) { return; };
        console.log('currentDate changed to ' + newValue + ', Broadcasting');
        $rootScope.$broadcast(DATE_FILTER_CHANGED, newValue);
      });

      $scope.$watch('currentShift', function(newValue, oldValue) {   
        // if(newValue === oldValue) { return; };
        console.log('currentShift changed to ' + newValue.englishName + ', Broadcasting');
        $rootScope.$broadcast(SHIFT_FILTER_CHANGED, newValue);
      });
}]);

