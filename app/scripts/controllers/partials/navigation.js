angular.module('ZedApp')
  .controller('NavCtrl', ['$scope', '$rootScope', '$state', '$q', '$http', 'Events', 'User', 'DATE_FILTER_CHANGED',
    function ($scope, $rootScope, $state, $q, $http, Events, User, DATE_FILTER_CHANGED) {

    $scope.currentDate = moment().format('DD/MM/YYYY');

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

}]);
