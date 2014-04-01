angular.module('ZedApp')
  .controller('TimesCtrl', ['$scope', '$rootScope', '$state', '$q', '$http', 'Events', 'Shifts', 'DATE_FILTER_CHANGED', 'TIME_FILTER_CHANGED',
    function ($scope, $rootScope, $state, $q, $http, Events, Shifts, DATE_FILTER_CHANGED, TIME_FILTER_CHANGED) {

      $scope.shifts = Shifts;
      $scope.currentShift = Shifts['Morning'];

      //Date Picker
      jQuery('#date-picker').datepicker();

      //Debugging
      $scope.onClick = function() {
        console.log($scope.currentTime);
      }

      //Broadcasting for filtering reasons
      $scope.$watch('currentShift', function(newValue, oldValue) {   
        if(newValue === oldValue) { return; };
        console.log('currentShift changed to ' + newValue.englishName + ', Broadcasting');
        $rootScope.$broadcast(DATE_FILTER_CHANGED, newValue);
      });

      $scope.$watch('currentTime', function(newValue, oldValue) {
        if(newValue === oldValue) { return; };
        console.log('currentTime changed to ' + newValue + ', Broadcasting');
        $rootScope.$broadcast(TIME_FILTER_CHANGED, newValue);
      });
      
}]);

