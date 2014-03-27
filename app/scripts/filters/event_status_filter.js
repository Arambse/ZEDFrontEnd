angular.module('ZedApp')
  .filter('eventStatus', ['GuestStatuses', function () {
  return function (input, chosenStatus) {
    console.log("chosenStatus:");
    console.log(chosenStatus);
    if (typeof chosenStatus == 'undefined' || chosenStatus == null || chosenStatus == -1) {
      return input;
    } else {
      var out = [];
      var statuses = -1;
      switch (chosenStatus) {
        case GuestStatuses.Sitting.identifierCode:
          statuses = GuestStatuses.Sitting.showStatus;
          break;
        case GuestStatuses.Ordered.identifierCode:
          statuses = GuestStatuses.Ordered.showStatus;
          break;
        case GuestStatuses.Occasional.identifierCode:
          statuses = GuestStatuses.Occasional.showStatus;
          break;
        case GuestStatuses.All.identifierCode:
          statuses = GuestStatuses.All.showStatus;
          break;
        default:
      }
      if (GuestStatuses.All.showStatus == statuses) {
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
