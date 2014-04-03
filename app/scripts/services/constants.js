angular.module('ZedApp')
.constant('SERVER_URL', 'http://10.0.0.12:54042/')
.constant('SESSION_TOKEN_KEY', 'sessionID')
.constant('USER_COOKIE_NAME','zUserInfo')
.constant('LOGIN_URL', 'login/default.aspx/gettoken')
.constant('GET_EVENTS_URL', 'ng_Events/EventsService.asmx/GetEvents')
.constant('GET_MAP_URL', 'ng_Events/EventsService.asmx/GetMap')
.constant('TIME_FILTER_CHANGED', 'TimeFilterChanged')
.constant('DATE_FILTER_CHANGED', 'DateFilterChanged')
.constant('SHIFT_FILTER_CHANGED', 'ShiftFilterChanged');

