'use strict';

angular.module('ZedApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ui.router',
  'ui.bootstrap',
  'ngAnimate',
  'LocalStorageModule'
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
        data:{
           statusFilter:'10'
        }
      })
      .state('user.events.main.sitting', {
        url: '/sitting',
        data:{
           statusFilter:'100'
        }
      })
      .state('user.events.main.ordered', {
        url: '/ordered',
        data:{
           statusFilter:'50'
        }
      })
      .state('user.events.main.occasional', {
        url: '/occasional',
        data:{
           statusFilter:'20'
        }
      })
      .state('user.events.main.alarms', {
        url: '/alarms',
        data:{
           statusFilter:'30'
        }
      });

  });

