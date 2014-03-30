angular.module('ZedApp').service('EventStatuses', [ function() {

  return eventsStatusesEnum = {
  	Ordered: { identifierCode: '40', color: 'orange', englishName: 'Ordered', hebrewName: 'מוזמן'},
  	Confirmation: { identifierCode: '10', color: 'lightblue', englishName: 'Confirmation', hebrewName: 'אישור'},
  	Sitting: { identifierCode: '20', color: 'green', englishName: 'Sitting', hebrewName: 'יושב'},
  	Bill: { identifierCode: '30', color: 'red', englishName: 'Bill', hebrewName: 'חשבון'},
  	Occasional: { identifierCode: '50', color: 'yellow', englishName: 'Occasional', hebrewName: 'מזדמן'},
  	Finished: { identifierCode: '70', color: 'lightgray', englishName: 'Finished', hebrewName: 'סיים'},
  	Canceled: { identifierCode: '80', color: 'violet', englishName: 'Canceled', hebrewName: 'בוטל'},
  	New: { identifierCode: '222', color: 'purple', englishName: 'New', hebrewName: 'חדש'},
  }
}]);	
