angular.module('ZedApp.Filters', ['ZedApp.Providers'])
  .filter('eventStatus', ['guestStatuses', function (guestStatusesProvider) {
  return function (input, currentStatus) {

    console.log('Filtering events for current status ' + currentStatus);
    if (typeof input === 'undefined' || input === null || currentStatus == null) {
      console.log('No data sent to filter');
      return input;
    }
    
    var filterdArray = [];
    switch (currentStatus) {
      case guestStatusesProvider.statuses().Sitting.englishName:
        statuses = guestStatusesProvider.statuses().Sitting.showStatus;
        break;
      case guestStatusesProvider.statuses().Ordered.englishName:
        statuses = guestStatusesProvider.statuses().Ordered.showStatus;
        break;
      case guestStatusesProvider.statuses().Occasional.englishName:
        statuses = guestStatusesProvider.statuses().Occasional.showStatus;
        break;
      case guestStatusesProvider.statuses().All.englishName:
        statuses = guestStatusesProvider.statuses().All.showStatus;
        break;
      default:
    }
    for (i = 0; i < input.length; i++) {
      var eventStatusString = input[i].id_event_status.toString();
      if (statuses.indexOf(eventStatusString) != -1) {
        filterdArray.push(input[i]);
      }
    }
    return filterdArray;
  }
}]);
