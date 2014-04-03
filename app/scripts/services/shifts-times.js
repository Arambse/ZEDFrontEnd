angular.module('ZedApp.Services')
  .service('ShiftsTimes', [ function() {

  var timeFormat = 'HH:mm';

  var morningStartTime = '08:00', morningEndTime = '12:00';
  var noonStartTime = '12:00', noonEndTime = '20:00';
  var eveningStartTime = '20:00', eveningEndTime = '06:00';
  
  var timesInterval = 60;

  var morningTimes = null;
  var noonTimes = null;
  var eveningTimes = null;

  this.morningTimes = function() {
    if (!morningTimes) { morningTimes = generateTimes(morningStartTime, morningEndTime, timesInterval, timeFormat); }
    return morningTimes;
  }

  this.noonTimes = function() {
    if (!noonTimes) { noonTimes = generateTimes(noonStartTime, noonEndTime, timesInterval, timeFormat); };
    return noonTimes;
  }

  this.eveningTimes = function() {
    if (!eveningTimes) { eveningTimes = generateTimes(eveningStartTime, eveningEndTime, timesInterval, timeFormat); };
    return eveningTimes;
  }
  
  function generateTimes(startTime, endTime, interval, timeFormat) {
    var startTimeMoment = moment(startTime,timeFormat);
    var endTimeMoment = moment(endTime,timeFormat);
    var durationInMinutes = Math.abs(endTimeMoment.diff(startTimeMoment,'Minutes'));
    var numberOfMoments = durationInMinutes / interval;

    var timesArray = [];

    for (var i = 0; i < numberOfMoments + 1; i++) {
      var newMoment = moment(startTimeMoment).add('m', i * interval);
      var momentString = newMoment.format(timeFormat);
      momentString = momentString.substring(0,momentString.indexOf(':'));
      timesArray.push(momentString);
    }

    return timesArray;
   };

}]);