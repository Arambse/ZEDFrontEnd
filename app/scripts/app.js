'use strict';

angular.module('ZedApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ui.router',
  'LocalStorageModule',
  'ngTable'
])
  .config(function ($stateProvider, $urlRouterProvider) {

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
        url: '/user',
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
            templateUrl: 'views/events/map.html',
            controller: 'MapCtrl'
          },
          'events_list': {
            templateUrl: 'views/events/events_list.html',
            controller: 'EventsListCtrl'
          },
          'times': {
            templateUrl: 'views/events/times.html'
          }
        }
      });

    //Private Filtering States
    $stateProvider.
      state('user.events.main.all', {
        url: '/all',
      })
      .state('user.events.main.sitting', {
        url: '/sitting',
      })
      .state('user.events.main.ordered', {
        url: '/ordered',
      })
      .state('user.events.main.occasional', {
        url: '/occasional',
      })
      .state('user.events.main.alarms', {
        url: '/alarms',
      });

  });

