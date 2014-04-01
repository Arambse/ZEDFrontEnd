angular.module('ZedApp')
  .controller('TimesCtrl', ['$scope', '$state', '$q', '$http', 'Events', 'User',
    function ($scope, $state, $q, $http, Events, User) {
    
      //Time picker
      jQuery('#time-picker').timepicker({
         defaultTime: 'current',
        minuteStep: 15,
        showMeridian: false,
        showWidget: true,
        disableFocus: true,
        template: 'dropdown'
      });

      //Date Picker
      jQuery('#date-picker').datepicker();

}]);

