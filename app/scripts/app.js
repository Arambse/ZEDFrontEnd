'use strict';

angular.module('ZedApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ui.router'
])
  .config(function ($stateProvider, $urlRouterProvider) {

    // $urlRouterProvider.otherwise("/events");

    //Anonymous user States
    $stateProvider
      .state('anonymous', {
        abstract: true,
        template: '<ui-view/>'
      })
      .state('anonymous.login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
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
        templateUrl: 'views/events.html'
      })
      //Main evnts page subviews
      .state('user.events.main', {
        url: '/events',
        templateUrl: 'views/events.html',
        views: {
          'map': {
            templateUrl: 'views/events/map.html'
          },
          'events_list': {
            templateUrl: 'views/events/events_list.html'
          },
          'navigation': {
            templateUrl: 'views/events/navigation.html'
          },
          'times': {
            templateUrl: 'views/events/times.html'
          }
        }
      });
  });
