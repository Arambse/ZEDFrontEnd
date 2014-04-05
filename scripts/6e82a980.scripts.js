"use strict";var myApp=angular.module("ZedApp",["ngCookies","ngResource","ngSanitize","ngRoute","ui.router","ui.bootstrap","ngAnimate","LocalStorageModule","ZedApp.Providers","ZedApp.Filters","ZedApp.Services","ZedApp.Directives"]).config(["$stateProvider","$urlRouterProvider","guestStatusesProvider",function(a,b,c){b.otherwise("/login"),a.state("anonymous",{"abstract":!0,template:"<ui-view/>",controller:"MainCtrl"}).state("anonymous.login",{templateUrl:"views/login.html",controller:"LoginCtrl",url:"/login"}).state("anonymous.register",{templateUrl:"views/register.html",controller:"RegisterCtrl"}),a.state("user",{"abstract":!0,url:"",template:"<ui-view/>"}).state("user.events",{"abstract":!0,templateUrl:"views/events.html",controller:"EventsCtrl"}).state("user.events.main",{url:"/events",views:{navigation:{templateUrl:"views/partials/navigation.html",controller:"NavCtrl"},map:{templateUrl:"views/partials/map.html",controller:"MapCtrl"},"events-list":{templateUrl:"views/partials/events-list.html",controller:"EventsListCtrl"}}}),a.state("user.events.main.all",{url:"/all",data:{statusFilter:c.statuses().All.englishName}}).state("user.events.main.sitting",{url:"/sitting",data:{statusFilter:c.statuses().Sitting.englishName}}).state("user.events.main.ordered",{url:"/ordered",data:{statusFilter:c.statuses().Ordered.englishName}}).state("user.events.main.occasional",{url:"/occasional",data:{statusFilter:c.statuses().Occasional.englishName}}).state("user.events.main.alarms",{url:"/alarms",data:{}})}]);angular.module("ZedApp").service("Authentication",["$http","$state","$q","localStorageService","User","SERVER_URL","LOGIN_URL",function(a,b,c,d,e,f,g){this.login=function(b,d){console.log("Logging in for "+b+" with Pass "+d);var e=f+g,h={Authorization:"Basic "+btoa(b+":"+d),"Content-type":"application/json; charset=utf-8"},i=c.defer();return a({method:"POST",url:e,headers:h,data:""}).success(function(a){console.log(a),i.resolve(a)}).error(function(a){console.log(a),i.reject(a)}),i.promise},this.retrieveAuthToken=function(){var a=d.get("zedAuthToken");return console.log("retrieved AuthToken "+a),a};var h=function(b){a.defaults.headers.common.sessionID=b,console.log("updated sessionID Header with token "+b)};e.registerObserverCallback(h)}]),angular.module("ZedApp").service("Events",["$http","$window","$q","User","SERVER_URL","GET_EVENTS_URL",function(a,b,c,d,e,f){var g=null,h=null;this.getEvents=function(b,i,j){var k="06:00",l="02:00";console.log("getting events for: "+b+", "+k+", "+l),console.log("for user "+d.username+" with session id "+d.sessionID);var m=e+f,n={"Content-Type":"application/json; charset=utf-8",sessionID:d.sessionID},o=c.defer();return a.post(m,{StartTime:k,EndTime:l,DateSTR:b,WarnOnCollisions:i,WarnOnLateOrOpen:j},{headers:n}).success(function(a){console.log(a);var b=JSON.parse(a.d);g=b.events,h=b.collisions,o.resolve({events:g,collisions:h})}).error(function(a){console.error(a),o.reject(a)}),o.promise},this.getEventsInfo=function(){}}]),angular.module("ZedApp").service("User",[function(){this.updateUserDetailes=function(a,b){this.username=a,this.sessionID=b,console.log("updated username "+a+" with sessionID "+b),this.notifyObservers(this.sessionID)};var a=[];this.registerObserverCallback=function(b){a.push(b)},this.notifyObservers=function(b){console.log("User notified observers of token update with token "+b),angular.forEach(a,function(a){a(b)})}}]),angular.module("ZedApp").constant("SERVER_URL","http://zed.streetwise.co.il:8085/").constant("SESSION_TOKEN_KEY","sessionID").constant("USER_COOKIE_NAME","zUserInfo").constant("LOGIN_URL","login/default.aspx/gettoken").constant("GET_EVENTS_URL","ng_Events/EventsService.asmx/GetEvents").constant("GET_SINGLE_DAY_URL","HoursManagement/HoursService.asmx/GetSingleDay").constant("GET_SHIFT_STATS_URL","ng_Events/EventsService.asmx/GetShiftStats").constant("GET_MAP_URL","ng_Events/EventsService.asmx/GetMap").constant("TIME_FILTER_CHANGED","TimeFilterChanged").constant("DATE_FILTER_CHANGED","DateFilterChanged").constant("SHIFT_FILTER_CHANGED","ShiftFilterChanged"),angular.module("ZedApp.Services",[]).service("EventStatuses",[function(){return eventsStatusesEnum={Ordered:{identifierCode:"10",color:"lightblue",englishName:"Ordered",hebrewName:"מוזמן"},Confirmation:{identifierCode:"20",color:"green",englishName:"Confirmation",hebrewName:"אישור"},Sitting:{identifierCode:"30",color:"red",englishName:"Sitting",hebrewName:"יושב"},Bill:{identifierCode:"40",color:"orange",englishName:"Bill",hebrewName:"חשבון"},Occasional:{identifierCode:"50",color:"yellow",englishName:"Occasional",hebrewName:"מזדמן"},Finished:{identifierCode:"60",color:"gray",englishName:"Finished",hebrewName:"סיים"},Canceled:{identifierCode:"70",color:"lightgray",englishName:"Canceled",hebrewName:"בוטל"},New:{identifierCode:"80",color:"violet",englishName:"New",hebrewName:"חדש"}}}]),angular.module("ZedApp.Services",[]).service("Shifts",["$q","$http","ShiftsTimes","SERVER_URL","GET_SINGLE_DAY_URL",function(a,b,c,d,e){this.shiftsMinutes=function(){return["00","15","30","45"]},this.shifts=function(){return{Morning:{identifierCode:"1",times:c.morningTimes(),englishName:"Morning",hebrewName:"בוקר"},Noon:{identifierCode:"2",times:c.noonTimes(),englishName:"Noon",hebrewName:"צהריים"},Evening:{identifierCode:"3",times:c.eveningTimes(),englishName:"Evening",hebrewName:"ערב"}}},this.getDay=function(c){var f=d+e,g={"Content-Type":"application/json; charset=utf-8"},h=a.defer();return b.post(f,{dateSTR:c},{headers:g}).success(function(a){console.log(a),h.resolve(a)}).error(function(a){console.error(a),h.reject(a)}),h.promise}}]),angular.module("ZedApp.Services").service("ShiftsTimes",[function(){function a(a,b,c,d){for(var e=moment(a,d),f=moment(b,d),g=Math.abs(f.diff(e,"Minutes")),h=g/c,i=[],j=0;h+1>j;j++){var k=moment(e).add("m",j*c),l=k.format(d);l=l.substring(0,l.indexOf(":")),i.push(l)}return i}var b="HH:mm",c="08:00",d="12:00",e="12:00",f="20:00",g="20:00",h="06:00",i=60,j=null,k=null,l=null;this.morningTimes=function(){return j||(j=a(c,d,i,b)),j},this.noonTimes=function(){return k||(k=a(e,f,i,b)),k},this.eveningTimes=function(){return l||(l=a(g,h,i,b)),l}}]),angular.module("ZedApp.Directives",[]).directive("date-picker",function(){return{require:"ngModel",link:function(a,b,c,d){$(b).datepicker({onSelect:function(b){console.log("asdasdsadasdas"),a.$apply(function(){d.$setViewValue(b)})}})}}}),angular.module("ZedApp.Providers",[]).provider("guestStatuses",function a(){this.statuses=function(){return{All:{identifierCode:999,hebrewName:"הכול",englishName:"All",showStatus:["10","20","30","40","50","60","70","80","222"]},Sitting:{identifierCode:100,hebrewName:"יושב",englishName:"Sitting",showStatus:["30","40"]},Ordered:{identifierCode:101,hebrewName:"מוזמן",englishName:"Ordered",showStatus:["10","20"]},Occasional:{identifierCode:200,hebrewName:"מזדמן",englishName:"Occasional",showStatus:["50"]}}},this.$get=function(){return new a}}),angular.module("ZedApp.Filters",["ZedApp.Providers"]).filter("eventStatus",["guestStatuses",function(a){return function(b,c){if(console.log("Filtering events for current status "+c),"undefined"==typeof b||null===b||null==c)return console.log("No data sent to filter"),b;var d=[];switch(c){case a.statuses().Sitting.englishName:statuses=a.statuses().Sitting.showStatus;break;case a.statuses().Ordered.englishName:statuses=a.statuses().Ordered.showStatus;break;case a.statuses().Occasional.englishName:statuses=a.statuses().Occasional.showStatus;break;case a.statuses().All.englishName:statuses=a.statuses().All.showStatus}for(i=0;i<b.length;i++){var e=b[i].id_event_status.toString();-1!=statuses.indexOf(e)&&d.push(b[i])}return d}}]),angular.module("ZedApp.Filters").filter("time",[function(){return function(a,b,c){if(console.log(b+" "+c),"undefined"==typeof a||null===a)return a;var d=2,e="HH:mm:ss",f="HH:mm",g=moment(b,f),h=[];if(null===b)for(i=0;i<a.length;i++){var j=a[i].start_time.toString(),k=j.split(":"),l=k[0];-1!=c.times.indexOf(l)&&h.push(a[i])}else for(i=0;i<a.length;i++){var m=a[i].start_time.toString(),n=moment(m,e),o=Math.abs(n.diff(g,"Hours"));d>o&&h.push(a[i])}return h}}]),angular.module("ZedApp").controller("MainCtrl",["$scope","$state","User","Authentication",function(a,b,c){b.go(c.sessionID?"user.events.main.all":"anonymous.login")}]),angular.module("ZedApp").controller("LoginCtrl",["$scope","$state","localStorageService","User","Authentication",function(a,b,c,d,e){a.isLoading=!1,a.isAuthenticated=!1,a.loginError=null,a.login=function(){a.isLoading=!0;var f=e.login(a.username,a.password);f.then(function(e){console.log("Successful login"),d.updateUserDetailes(a.username,e.d),c.add("zedAuthToken",d.sessionID),a.isLoading=!1,a.isAuthenticated=!0,b.go("user.events.main.all")},function(b){console.log("Error in login"),a.isLoading=!1,a.loginError=b})},a.hasErrors=function(){return a.loginError}}]),angular.module("ZedApp").controller("EventsCtrl",["$scope","$state","$q","$http","Events","User",function(){}]),angular.module("ZedApp").controller("MapCtrl",["$scope","$state","$q","$http","Events","User",function(a,b,c,d,e){a.getEvents=function(){a.isLoading=!0;var b="10:15",c="21:15",d="22/03/2014",f=!0,g=!1,h=e.getEvents(d,b,c,f,g);h.then(function(){console.log("Successfully Fetched Events"),a.isLoading=!1},function(){console.log("Error in fetching Events"),a.isLoading=!1})}}]),angular.module("ZedApp").controller("EventsListCtrl",["$scope","$state","$location","Events","User","Shifts","DATE_FILTER_CHANGED","TIME_FILTER_CHANGED","SHIFT_FILTER_CHANGED",function(a,b,c,d,e,f,g,h,i){a.statusFilter=b.current.data.statusFilter,a.getEvents=function(b,c,e){var f=d.getEvents(b,c,e);f.then(function(b){console.log("Successfully Fetched Events"),a.isLoading=!1,a.events=b.events,a.collisions=b.collisions},function(){console.log("Error in fetching Events"),a.isLoading=!1})},a.$on("$stateChangeStart",function(b,c){a.statusFilter=c.data.statusFilter,console.log("status filter for state is "+a.statusFilter)}),a.$on(g,function(b,c){a.getEvents(c,k,l)}),a.$on(h,function(b,c){a.currentTime=c}),a.$on(i,function(b,c){a.currentShift=c});var j="28/12/2013",k=!0,l=!1;a.getEvents(j,k,l)}]),angular.module("ZedApp").controller("TimesCtrl",["$scope","$rootScope","$state","$q","$http","Events","Shifts","TIME_FILTER_CHANGED","SHIFT_FILTER_CHANGED",function(a,b,c,d,e,f,g,h,i){a.shifts=g,a.currentShift=g.Morning,a.currentTime=null,a.$watch("currentTime",function(a){console.log("currentTime changed to "+a+", Broadcasting"),b.$broadcast(h,a)}),a.$watch("currentShift",function(a){console.log("currentShift changed to "+a.englishName+", Broadcasting"),b.$broadcast(i,a)})}]),angular.module("ZedApp").controller("NavCtrl",["$scope","$rootScope","Shifts","DATE_FILTER_CHANGED","TIME_FILTER_CHANGED","SHIFT_FILTER_CHANGED",function(a,b,c,d,e,f){a.shifts=c.shifts(),a.shiftsMinutes=c.shiftsMinutes(),a.currentDate=moment().format("DD/MM/YYYY"),a.currentShift=a.shifts.Evening,a.currentTime=null,a.currentMinutes=a.shiftsMinutes[0],a.currentHour=null,$("#date-picker").datepicker().on("changeDate",function(a){var b=new Date(a.date);currentDate=b,console.log("new date :"+currentDate)}),a.$watch("currentDate",function(a){console.log("currentDate changed to "+a+", Broadcasting"),b.$broadcast(d,a)}),a.$watch("currentTime",function(a){console.log("currentTime changed to "+a+", Broadcasting"),b.$broadcast(e,a)}),a.$watch("currentShift",function(a){console.log("currentShift changed to "+a.englishName+", Broadcasting"),b.$broadcast(f,a)}),a.timeChanged=function(){a.currentTime=null===a.currentHour?null:a.currentHour+":"+a.currentMinutes,console.log(a.currentTime)},a.nowDateDataFormated=function(){return moment(a.currentDate,"DD/MM/YYYY").format("MMMM Do")},a.nowTimeDataFormated=function(){return moment().format("HH:mm")}}]);