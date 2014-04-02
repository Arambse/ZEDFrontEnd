angular.module('ZedApp')
  .controller('TimesCtrl', ['$scope', '$rootScope', '$state', '$q', '$http', 'Events', 'Shifts', 'TIME_FILTER_CHANGED', 'SHIFT_FILTER_CHANGED',
    function ($scope, $rootScope, $state, $q, $http, Events, Shifts, TIME_FILTER_CHANGED, SHIFT_FILTER_CHANGED) {

      $scope.shifts = Shifts;
      $scope.currentShift = Shifts['Morning'];
      $scope.currentTime = null;

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

