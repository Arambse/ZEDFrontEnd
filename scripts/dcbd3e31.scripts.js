"use strict";var myApp=angular.module("ZedApp",["ngCookies","ngResource","ngSanitize","ngRoute","ngTouch","ui.router","ui.bootstrap","ngAnimate","pascalprecht.translate","LocalStorageModule","ZedAppControllers","ZedAppServices","ZedAppProviders"]).run(function(){FastClick.attach(document.body)}).config(["$stateProvider","$urlRouterProvider","guestStatusesProvider",function(a,b,c){b.otherwise("/login"),a.state("anonymous",{"abstract":!0,template:"<ui-view/>",controller:"MainCtrl"}).state("anonymous.login",{templateUrl:"views/login.html",controller:"LoginCtrl",url:"/login"}).state("anonymous.register",{templateUrl:"views/register.html",controller:"RegisterCtrl"}),a.state("user",{"abstract":!0,url:"",template:"<ui-view/>"}).state("user.events",{"abstract":!0,templateUrl:"views/events.html",controller:"EventsCtrl"}).state("user.events.main",{url:"/events",views:{navigation:{templateUrl:"views/partials/navigation.html",controller:"NavCtrl"},map:{templateUrl:"views/partials/map.html",controller:"MapCtrl"},"events-list":{templateUrl:"views/partials/events-list.html",controller:"EventsListCtrl"}}}),a.state("user.events.main.all",{url:"/all",data:{statusFilter:c.statuses().All.englishName}}).state("user.events.main.sitting",{url:"/sitting",data:{statusFilter:c.statuses().Sitting.englishName}}).state("user.events.main.ordered",{url:"/ordered",data:{statusFilter:c.statuses().Ordered.englishName}}).state("user.events.main.occasional",{url:"/occasional",data:{statusFilter:c.statuses().Occasional.englishName}}).state("user.events.main.alarms",{url:"/alarms",data:{}})}]);angular.module("ZedAppServices",[]).service("User",[function(){this.updateUserDetailes=function(a,b){this.username=a,this.sessionID=b,console.log("updated username "+a+" with sessionID "+b),this.notifyObservers(this.sessionID)};var a=[];this.registerObserverCallback=function(b){a.push(b)},this.notifyObservers=function(b){console.log("User notified observers of token update with token "+b),angular.forEach(a,function(a){a(b)})}}]),angular.module("ZedAppServices").service("Authentication",["$http","$state","$q","localStorageService","User","SERVER_URL","LOGIN_URL",function(a,b,c,d,e,f,g){this.login=function(b,d){console.log("Logging in for "+b+" with Pass "+d);var e=f+g,h={Authorization:"Basic "+btoa(b+":"+d),"Content-type":"application/json; charset=utf-8"},i=c.defer();return a({method:"POST",url:e,headers:h,data:""}).success(function(a){console.log(a),i.resolve(a)}).error(function(a){console.log(a),i.reject(a)}),i.promise},this.retrieveUserAuth=function(){var a=d.get("zedAuthToken"),b=d.get("zedUsername");console.log("retrieved AuthToken "+a);var c={authToken:a,username:b};return c};var h=function(b){a.defaults.headers.common.sessionID=b,console.log("updated sessionID Header with token "+b)};e.registerObserverCallback(h)}]),angular.module("ZedAppServices").service("Events",["$http","$q","User","EventStatuses","SERVER_URL","GET_EVENTS_URL","SET_EVENT_URL",function(a,b,c,d,e,f,g){var h=null,i=null;this.createEvent=function(){var a=new Object;return a.id_event_status=d.New.identifierCode,a.date=moment().format("DD/MM/YYYY"),a.start_time=moment().format("HH:mm:ss"),a.client_name="Default",a.seats=0,a.phone="",a.is_active=!0,console.log("created event with date "+a.date+" and time: "+a.start_time),a},this.getEvents=function(c,d,g){var j="06:00",k="02:00";console.log("Getting events for: "+c+", "+j+", "+k);var l=e+f,m=b.defer();return a.post(l,{StartTime:j,EndTime:k,DateSTR:c,WarnOnCollisions:d,WarnOnLateOrOpen:g}).success(function(a){console.log("Events fetching successful with data : "+JSON.stringify(a,null,4));var b=JSON.parse(a.d);h=b.events,i=b.collisions,m.resolve({events:h,collisions:i})}).error(function(a){console.error(a),m.reject(a)}),m.promise},this.setEvent=function(c){console.log("Setting new Event");var d=e+g,f={eventToSave:{date:c.date,start_time:c.start_time,id_event_status:c.id_event_status,event_type:c.event_type,client_name:c.client_name,guest_count:c.guest_count,seats:c.seats,phone:c.phone,email:c.email,contact_man:c.contact_man,comments:c.comments,const_comment:c.const_comment,is_active:c.is_active}};console.log(JSON.stringify(f,null,4));var j=b.defer();return a.post(d,f).success(function(a){console.log(a),j.resolve({events:h,collisions:i})}).error(function(a){console.error(a),j.reject(a)}),j.promise}}]),angular.module("ZedApp").constant("SERVER_URL","http://zed.streetwise.co.il:8085/").constant("SESSION_TOKEN_KEY","sessionID").constant("USER_COOKIE_NAME","zUserInfo").constant("LOGIN_URL","login/default.aspx/gettoken").constant("GET_EVENTS_URL","ng_Events/EventsService.asmx/GetEvents").constant("GET_SINGLE_DAY_URL","HoursManagement/HoursService.asmx/GetSingleDay").constant("GET_SHIFT_STATS_URL","ng_Events/EventsService.asmx/GetShiftStats").constant("GET_MAP_URL","ng_Events/EventsService.asmx/GetMap").constant("SET_EVENT_URL","ng_Events/EventsService.asmx/SetEvent").constant("TIME_FILTER_CHANGED","TimeFilterChanged").constant("DATE_FILTER_CHANGED","DateFilterChanged").constant("SHIFT_FILTER_CHANGED","ShiftFilterChanged"),angular.module("ZedAppServices").service("EventStatuses",[function(){return{Ordered:{identifierCode:"10",color:"lightblue",englishName:"Ordered",hebrewName:"מוזמן"},Confirmation:{identifierCode:"20",color:"green",englishName:"Confirmation",hebrewName:"אישור"},Sitting:{identifierCode:"30",color:"red",englishName:"Sitting",hebrewName:"יושב"},Bill:{identifierCode:"40",color:"orange",englishName:"Bill",hebrewName:"חשבון"},Occasional:{identifierCode:"50",color:"yellow",englishName:"Occasional",hebrewName:"מזדמן"},Finished:{identifierCode:"60",color:"gray",englishName:"Finished",hebrewName:"סיים"},Canceled:{identifierCode:"70",color:"lightgray",englishName:"Canceled",hebrewName:"בוטל"},New:{identifierCode:"80",color:"violet",englishName:"New",hebrewName:"חדש"}}}]),angular.module("ZedAppServices").service("Shifts",["$q","$http","ShiftsTimes","SERVER_URL","GET_SINGLE_DAY_URL",function(a,b,c,d,e){function f(a){var b=a.business_shifts;if(b)for(var d="HH:mm:ss",e=60,f=0;f<b.length;f++){var h=b[f];h.times=c.generateTimes(h.startTime,h.endTime,e,d),g.push(h)}}this.shiftsMinutes=function(){return["00","15","30","45"]};var g=[];this.shifts=function(){return g},this.getDay=function(c){var g=d+e,h=a.defer();return console.log("Getting shifs for date "+c),console.log(b.defaults.headers.common.sessionID),b.post(g,{dateSTR:c}).success(function(a){console.log("Shifts Fetching successful with data: "+JSON.stringify(a,null,4)),f(JSON.parse(a.d)),h.resolve(a)}).error(function(a){console.error(a),h.reject(a)}),h.promise}}]),angular.module("ZedAppServices").service("ShiftsTimes",[function(){this.generateTimes=function(a,b,c,d){console.log("Generating times for shift "+a+" "+b);for(var e=moment(a,d),f=moment(b,d),g=Math.abs(f.diff(e,"Minutes")),h=g/c,i=[],j=0;h+1>j;j++){var k=moment(e).add("m",j*c),l=k.format(d);l=l.substring(0,l.indexOf(":")),i.push(l)}return i}}]),angular.module("ZedApp.Directives",[]).directive("date-picker",function(){return{require:"ngModel",link:function(a,b,c,d){$(b).datepicker({onSelect:function(b){console.log("asdasdsadasdas"),a.$apply(function(){d.$setViewValue(b)})}})}}}),angular.module("ZedAppProviders",[]).provider("guestStatuses",function a(){this.statuses=function(){return{All:{identifierCode:999,hebrewName:"הכול",englishName:"All",showStatus:["10","20","30","40","50","60","70","80","222"]},Sitting:{identifierCode:100,hebrewName:"יושב",englishName:"Sitting",showStatus:["30","40"]},Ordered:{identifierCode:101,hebrewName:"מוזמן",englishName:"Ordered",showStatus:["10","20"]},Occasional:{identifierCode:200,hebrewName:"מזדמן",englishName:"Occasional",showStatus:["50"]}}},this.$get=function(){return new a}}),angular.module("ZedAppFilters",["ZedAppProviders"]).filter("eventStatus",["guestStatuses",function(a){return function(b,c){if("undefined"==typeof b||null===b||null==c)return b;var d=[],e=null;switch(c){case a.statuses().Sitting.englishName:e=a.statuses().Sitting.showStatus;break;case a.statuses().Ordered.englishName:e=a.statuses().Ordered.showStatus;break;case a.statuses().Occasional.englishName:e=a.statuses().Occasional.showStatus;break;case a.statuses().All.englishName:e=a.statuses().All.showStatus}for(var f=0;f<b.length;f++){var g=b[f].id_event_status.toString();-1!=e.indexOf(g)&&d.push(b[f])}return d}}]),angular.module("ZedAppFilters").filter("time",[function(){return function(a,b,c){if(console.log("Filtering times for times "+b+" and Shift "+c),"undefined"==typeof a||null===a)return a;var d=2,e="HH:mm:ss",f="HH:mm",g=moment(b,f),h=[];if(null===b)for(l=0;l<a.length;l++){var i=a[l].start_time.toString(),j=i.split(":"),k=j[0];-1!=c.times.indexOf(k)&&h.push(a[l])}else for(var l=0;l<a.length;l++){var m=a[l].start_time.toString(),n=moment(m,e),o=Math.abs(n.diff(g,"Hours"));d>o&&h.push(a[l])}return h}}]),angular.module("ZedAppControllers",["ZedAppServices","ZedAppFilters"]).controller("MainCtrl",["$scope","$state","User","Authentication",function(a,b,c){b.go(c.sessionID?"user.events.main.all":"anonymous.login")}]),angular.module("ZedAppControllers").controller("LoginCtrl",["$scope","$state","localStorageService","User","Authentication",function(a,b,c,d,e){a.isLoading=!1,a.isAuthenticated=!1,a.loginError=null,console.log(d),a.login=function(){a.isLoading=!0;var f=e.login(a.username,a.password);f.then(function(e){console.log("Successful login"),d.updateUserDetailes(a.username,e.d),c.add("zedAuthToken",d.sessionID),c.add("zedUsername",a.username),a.isLoading=!1,a.isAuthenticated=!0,b.go("user.events.main.all")},function(b){console.log("Error in login"),a.isLoading=!1,a.loginError=b})},a.hasErrors=function(){return a.loginError}}]),angular.module("ZedAppControllers").controller("EventsCtrl",["User","Authentication",function(a,b){var c=b.retrieveUserAuth();a.updateUserDetailes(c.username,c.authToken)}]),angular.module("ZedAppControllers").controller("MapCtrl",["$scope",function(a){a.getEvents=function(){}}]),angular.module("ZedAppControllers").controller("EventsListCtrl",["$scope","$state","$modal","Events","EventStatuses","User","Shifts","DATE_FILTER_CHANGED","TIME_FILTER_CHANGED","SHIFT_FILTER_CHANGED",function(a,b,c,d,e,f,g,h,i,j){a.statusFilter=b.current.data.statusFilter,a.eventStatuses=e,a.getEvents=function(b,c,e){var f=d.getEvents(b,c,e);f.then(function(b){a.isLoading=!1,a.events=b.events,a.collisions=b.collisions},function(){console.log("Error in fetching Events"),a.isLoading=!1})},a.setEvent=function(b){console.log("HEY");var c=d.setEvent(b);c.then(function(){a.isLoading=!1},function(){console.log("Error in fetching Events"),a.isLoading=!1})},a.addEvent=function(){a.events||(a.events=[]);var b=d.createEvent();a.events.push(b)},a.deleteEvent=function(b){if(a.events){var c=a.events.indexOf(b);c>-1&&a.events.splice(c,1)}},a.$on("$stateChangeStart",function(b,c){a.statusFilter=c.data.statusFilter}),a.$on(h,function(){}),a.$on(i,function(b,c){a.currentTime=c}),a.$on(j,function(b,c){a.currentShift=c}),a.rowTapped=function(){},a.openModal=function(){var b=c.open({templateUrl:"views/partials/modalAlert.html",controller:"ModalCtrl",resolve:{items:function(){return a.items}}});b.result.then(function(){},function(){})};var k=moment().format("DD/MM/YYYY"),l=!0,m=!1;a.getEvents(k,l,m)}]),angular.module("ZedAppControllers").controller("TimesCtrl",["$scope","$rootScope","$state","$q","$http","Events","Shifts","TIME_FILTER_CHANGED","SHIFT_FILTER_CHANGED",function(a,b,c,d,e,f,g,h,i){a.shifts=g,a.currentShift=g.Morning,a.currentTime=null,a.$watch("currentTime",function(a){console.log("currentTime changed to "+a+", Broadcasting"),b.$broadcast(h,a)}),a.$watch("currentShift",function(a){console.log("currentShift changed to "+a.englishName+", Broadcasting"),b.$broadcast(i,a)})}]),angular.module("ZedAppControllers").controller("NavCtrl",["$scope","$rootScope","Shifts","DATE_FILTER_CHANGED","TIME_FILTER_CHANGED","SHIFT_FILTER_CHANGED",function(a,b,c,d,e,f){a.shiftsMinutes=c.shiftsMinutes(),a.currentDate=moment().format("DD/MM/YYYY"),a.currentTime=null,a.currentMinutes=a.shiftsMinutes[0],a.currentHour=null,a.$watch("currentDate",function(a){b.$broadcast(d,a)}),a.$watch("currentTime",function(a){b.$broadcast(e,a)}),a.$watch("currentShift",function(a){void 0!=a&&console.log("currentShift changed to "+a.name+", Broadcasting"),b.$broadcast(f,a)}),a.timeChanged=function(){a.currentTime=null===a.currentHour?null:a.currentHour+":"+a.currentMinutes,console.log(a.currentTime)},a.nowDateDataFormated=function(){return moment(a.currentDate,"DD/MM/YYYY").format("MMMM Do")},a.nowTimeDataFormated=function(){return moment().format("HH:mm")},a.open=function(b){b.preventDefault(),b.stopPropagation(),a.opened=!0},a.dateOptions={"year-format":"'yy'","starting-day":1},a.format="yyyy/MM/dd";var g="28/12/2013";0===c.shifts().length&&(console.log("I HAVE CREATED A SHIFTS REQUEST!!!!"),c.getDay(g).then(function(){a.shifts=c.shifts(),a.currentShift=a.shifts[1],a.isLoading=!1},function(){console.log("Error in fetching Shifts"),a.isLoading=!1}))}]),angular.module("ZedAppControllers").controller("ModalCtrl",["$scope","$modalInstance",function(a,b){a.deleteEvent=function(){b.close(a.selected.item)},a.cancel=function(){b.dismiss("cancel")}}]);