angular.module('ZedApp.Filters', ['ZedApp.Providers'])
  .filter('eventStatus', ['guestStatuses', function (guestStatusesProvider) {
  return function (input, currentStatus) {
    console.log('Filtering events for current status ' + currentStatus);
    if (typeof currentStatus == 'undefined' || currentStatus == null || currentStatus == -1) {
      return input;
    } else {
      var out = [];
      var statuses = -1;
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
      if (guestStatusesProvider.statuses().All.showStatus == statuses) {
        for (i = 0; i < input.length; i++) {
          if (input[i].alertStatusID > 0) {
            out.push(input[i]);
          }
        }
      }
      else {
        for (i = 0; i < input.length; i++) {
          if (-1 != (statuses.indexOf(input[i].id_event_status))) {
            out.push(input[i]);
          }
        }
      }
      return out;
    }
  }
}]);
