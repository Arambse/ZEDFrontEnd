angular.module('ZedApp')
.constant('SERVER_URL', 'http://10.0.0.13:54042/')
.constant('LOGIN_URL', 'ZedWS.asmx/Login')
.constant('GET_EVENTS_URL', 'ng_Events/EventsService.asmx/GetEvents')
.constant('GET_MAP_URL', 'ng_Events/EventsService.asmx/GetMap');

