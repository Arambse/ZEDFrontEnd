angular.module('ZedApp.Filters')
  .filter('time', [function () {
  return function (input, filterTime, currentShift) {

    if (typeof input === 'undefined' || input === null) {
      return input;
    }

    var eventLengthInHours = 2;
    var eventTimeFormat = 'HH:mm:ss';
    var filterTimeFormat = 'HH:mm';
    var filterTimeMoment = moment(filterTime, filterTimeFormat);

    var filteredArray = [];

    // For All of the shift
    if (filterTime === null) {
      for (i = 0; i < input.length; i++) {
        var eventTime = input[i].start_time.toString();
        var eventTimeAsArray = eventTime.split(':');
        eventTime = eventTimeAsArray[0] + ':' + eventTimeAsArray[1];
        //If Event time is in the shift array of times
        if (currentShift.times.indexOf(eventTime) != -1) {
          filteredArray.push(input[i]);
        }
      }
    }
    //For particular time
    else {
      for (i = 0; i < input.length; i++) {
        var eventStartTime = input[i].start_time.toString();
        var eventStartTimeMoment = moment(eventStartTime, eventTimeFormat);
        var diffInHours = Math.abs(eventStartTimeMoment.diff(filterTimeMoment, 'Hours'));       
        //If Event is still ongoing
        if (diffInHours < eventLengthInHours) {
          filteredArray.push(input[i]);
        }
      }
    }
    return filteredArray;
  };

}]);
