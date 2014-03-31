'use strict';

var myApp = angular.module('ZedApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ui.router',
  'ui.bootstrap',
  'ngAnimate',
  'LocalStorageModule',
  'ZedApp.Providers',
  'ZedApp.Filters',
  'ZedApp.Services'
])
  .config(function ($stateProvider, $urlRouterProvider, guestStatusesProvider) {
    $urlRouterProvider.otherwise('/login');

    //Anonymous user States
    $stateProvider
      .state('anonymous', {
        abstract: true,
        template: '<ui-view/>',
        controller: 'MainCtrl'
      })
      .state('anonymous.login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        url: '/login'
      }) 
      .state('anonymous.register', {
        templateUrl: 'views/register.html',
        controller: 'RegisterCtrl'
      });

    //Known user States
    $stateProvider
      .state('user', {
        abstract: true,
        url: '',
        template: '<ui-view/>'
      }).
      //Abstract because views override templateUrl property
      state('user.events', {
        abstract: true,
        templateUrl: 'views/events.html',
        controller: 'EventsCtrl',
      })
      //Main evnts page subviews
      .state('user.events.main', {
        url: '/events',
        views: {
          'map': {
            templateUrl: 'views/partials/map.html',
            controller: 'MapCtrl'
          },
          'events_list': {
            templateUrl: 'views/partials/events-list.html',
            controller: 'EventsListCtrl'
          },
          'times': {
            templateUrl: 'views/partials/times.html'
          }
        }
      });

    //Private Filtering States
    $stateProvider.
      state('user.events.main.all', {
        url: '/all',
        data:{
           statusFilter: guestStatusesProvider.statuses().All.englishName
        }
      })
      .state('user.events.main.sitting', {
        url: '/sitting',
        data:{
           statusFilter: guestStatusesProvider.statuses().Sitting.englishName
        }
      })
      .state('user.events.main.ordered', {
        url: '/ordered',
        data:{
           statusFilter: guestStatusesProvider.statuses().Ordered.englishName
        }
      })
      .state('user.events.main.occasional', {
        url: '/occasional',
        data:{
           statusFilter: guestStatusesProvider.statuses().Occasional.englishName
        }
      })
      .state('user.events.main.alarms', {
        url: '/alarms',
        data:{
           // statusFilter: guestStatusesProvider.statuses().Alarms.englishName
        }
      });

  });
