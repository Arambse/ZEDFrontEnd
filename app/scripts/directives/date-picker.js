angular.module('ZedApp.Directives', [])
  .directive('date-picker', function() {
    return {
      require: 'ngModel',
      link: function(scope, el, attr, ngModel) {
        $(el).datepicker({
          onSelect: function(dateText) {
            console.log('asdasdsadasdas');
            scope.$apply(function() {
              ngModel.$setViewValue(dateText);
            });
          }
        });
      }
    };
  });