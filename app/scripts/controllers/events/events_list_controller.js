angular.module('ZedApp')
  .controller('EventsListCtrl', ['$scope', '$state', '$q', '$http', 'Events', 'User',
   function ($scope, $state, $q, $http, Events, User) {
    
   $scope.friends = [ {name:'John', phone:'555-1276'},
                     {name:'Mary', phone:'800-BIG-MARY'},
                     {name:'Mike', phone:'555-4321'},
                     {name:'Adam', phone:'555-5678'},
                     {name:'Julie', phone:'555-8765'},
                    ];
    
  }]);
