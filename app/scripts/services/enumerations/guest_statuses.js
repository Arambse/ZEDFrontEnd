angular.module('ZedApp').service('GuestStatuses', [ function() {

  return statusesEnum = {
	All: { identifierCode: 999, hebrewName: 'הכול', englishName: 'All', showStatus: 'all' },
	Sitting: { identifierCode: 100, hebrewName: 'יושב', englishName: 'Sitting', showStatus: '30|40' },
	Ordered: { identifierCode: 101, hebrewName: 'מוזמן', englishName: 'Ordered', showStatus: '10|20' },
	Occasional: { identifierCode: 200, hebrewName: 'מזדמן', englishName: 'Occasional', showStatus: '50'},
	};

}]);