angular.module('ZedApp')
  .controller('NavCtrl', ['$scope', '$rootScope', 'Shifts', 'DATE_FILTER_CHANGED', 'TIME_FILTER_CHANGED', 'SHIFT_FILTER_CHANGED',
    function ($scope, $rootScope, Shifts, DATE_FILTER_CHANGED, TIME_FILTER_CHANGED, SHIFT_FILTER_CHANGED) {

      $scope.shifts = Shifts.shifts();
      $scope.shiftsMinutes = Shifts.shiftsMinutes();

      //Starting Values for html - Should stay here or move to html ng-init ASK
      $scope.currentDate = moment().format('DD/MM/YYYY');
      $scope.currentShift = $scope.shifts['Evening'];
      $scope.currentTime = null;
      $scope.currentMinutes = $scope.shiftsMinutes[0];
      $scope.currentHour = null;
      //End of starting value;

      $('#date-picker').datepicker()
        .on('changeDate', function(ev) {
          var newDate = new Date(ev.date)
          currentDate = newDate;
          console.log('new date :' + currentDate);
        });

      //Broadcasting for filtering reasons
      $scope.$watch('currentDate', function(newValue, oldValue) {
        console.log('currentDate changed to ' + newValue + ', Broadcasting');
        $rootScope.$broadcast(DATE_FILTER_CHANGED, newValue);
      });

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

      //In order to not watch more variables
      $scope.timeChanged = function() {
        //Entire shift
        if ($scope.currentHour === null) {
          $scope.currentTime = null;
        }
        else {
          $scope.currentTime = $scope.currentHour + ':' + $scope.currentMinutes;
        }
        console.log($scope.currentTime);
      };

      $scope.nowDateDataFormated = function() {
        return moment().format('MMMM Do');
      }
      $scope.nowTimeDataFormated = function() {
        return moment().format('HH:mm');
      }

}]);
