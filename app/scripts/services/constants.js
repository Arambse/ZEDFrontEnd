angular.module('ZedApp')
.constant('SERVER_URL', 'http://10.0.0.12:54042/')
.constant('SESSION_TOKEN_KEY', 'sessionID')
.constant('USER_COOKIE_NAME','zUserInfo')
.constant('LOGIN_URL', 'login/defaults.aspx/gettoken')
.constant('GET_EVENTS_URL', 'ng_Events/EventsService.asmx/GetEvents')
.constant('GET_MAP_URL', 'ng_Events/EventsService.asmx/GetMap');

