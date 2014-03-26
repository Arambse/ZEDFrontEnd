angular.module('ZedApp').service('GuestStatuses', [ function() {

  return statusesEnum = {
	All: { id: -1, hebrewName: 'הכול', englishName: 'All' },
	Sitting: { id: 100, hebrewName: 'יושב', englishName: 'Sitting', showStatus: '30|40' },
	Ordered: { id: 101, hebrewName: 'מוזמן', englishName: 'Ordered', showStatus: '10|20' },
	Occasional: { id: 200, hebrewName: 'מזדמן', englishName: 'Occasional', showStatus: '50'}
	};

}]);