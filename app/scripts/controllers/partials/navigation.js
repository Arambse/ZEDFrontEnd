angular.module('ZedApp')
  .controller('NavCtrl', ['$scope', '$rootScope', 'Events', 'User', 'Shifts', 'DATE_FILTER_CHANGED', 'TIME_FILTER_CHANGED', 'SHIFT_FILTER_CHANGED',
    function ($scope, $rootScope, Events, User, Shifts, DATE_FILTER_CHANGED, TIME_FILTER_CHANGED, SHIFT_FILTER_CHANGED) {

    $scope.currentDate = moment().format('DD/MM/YYYY');
    $scope.shifts = Shifts;
    $scope.currentShift = Shifts['Evening'];
    $scope.currentTime = null;

    $('#date-picker').datepicker()
      .on('changeDate', function(ev) {
        var newDate = new Date(ev.date)
        currentDate = newDate;
        console.log('new date :' + currentDate);
      });

    $scope.$watch('currentDate', function(newValue, oldValue) {
      console.log('currentDate changed to ' + newValue + ', Broadcasting');
      $rootScope.$broadcast(DATE_FILTER_CHANGED, newValue);
    });

      //Broadcasting for filtering reasons
    $scope.$watch('currentTime', function(newValue, oldValue) {
      // if(newValue === oldValue) { return; };
      console.log('currentTime changed to ' + newValue + ', Broadcasting');
      $rootScope.$broadcast(TIME_FILTER_CHANGED, newValue);
    });

    $scope.$watch('currentShift', function(newValue, oldValue) {   
      // if(newValue === oldValue) { return; };
      console.log('currentShift changed to ' + newValue.englishName + ', Broadcasting');
      $rootScope.$broadcast(SHIFT_FILTER_CHANGED, newValue);
    });

}]);
