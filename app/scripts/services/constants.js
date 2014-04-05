angular.module('ZedApp')
.constant('SERVER_URL', 'http://zed.streetwise.co.il:8085/')
.constant('SESSION_TOKEN_KEY', 'sessionID')
.constant('USER_COOKIE_NAME','zUserInfo')

.constant('LOGIN_URL', 'login/default.aspx/gettoken')
.constant('GET_EVENTS_URL', 'ng_Events/EventsService.asmx/GetEvents')
.constant('GET_SINGLE_DAY_URL', 'HoursManagement/HoursService.asmx/GetSingleDay')
.constant('GET_SHIFT_STATS_URL', 'ng_Events/EventsService.asmx/GetShiftStats')
.constant('GET_MAP_URL', 'ng_Events/EventsService.asmx/GetMap')

.constant('TIME_FILTER_CHANGED', 'TimeFilterChanged')
.constant('DATE_FILTER_CHANGED', 'DateFilterChanged')
.constant('SHIFT_FILTER_CHANGED', 'ShiftFilterChanged');

