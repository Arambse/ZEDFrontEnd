angular.module('ZedApp.Services', []).service('EventStatuses', [ function() {

  return eventsStatusesEnum = {
    Ordered: { identifierCode: '10', color: 'lightblue', englishName: 'Ordered', hebrewName: 'מוזמן'},
  	Confirmation: { identifierCode: '20', color: 'green', englishName: 'Confirmation', hebrewName: 'אישור'},
  	Sitting: { identifierCode: '30', color: 'red', englishName: 'Sitting', hebrewName: 'יושב'},
    Bill: { identifierCode: '40', color: 'orange', englishName: 'Bill', hebrewName: 'חשבון'},
  	Occasional: { identifierCode: '50', color: 'yellow', englishName: 'Occasional', hebrewName: 'מזדמן'},
  	Finished: { identifierCode: '60', color: 'gray', englishName: 'Finished', hebrewName: 'סיים'},
  	Canceled: { identifierCode: '70', color: 'lightgray', englishName: 'Canceled', hebrewName: 'בוטל'},
  	New: { identifierCode: '80', color: 'violet', englishName: 'New', hebrewName: 'חדש'},
  }
}]);	
