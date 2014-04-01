angular.module('ZedApp')
  .controller('TimesCtrl', ['$scope', '$state', '$q', '$http', 'Events', 'Shifts',
    function ($scope, $state, $q, $http, Events, Shifts) {

      $scope.shifts = Shifts;
      $scope.currentShift = Shifts['Morning'];

      //Date Picker
      jQuery('#date-picker').datepicker();

      //Debugging
      $scope.shiftChanged = function() {
        console.log($scope.currentTime);
      }

}]);

