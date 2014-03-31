angular.module('ZedApp.Providers', [])
	.provider('guestStatuses', function GuestStatusesProvider() {
   
  this.statuses = function() {
	return { 
	  All: { identifierCode: 999, hebrewName: 'הכול', englishName: 'All', showStatus: ['10','20','30','40','50','60','70','80','222'] },
	  Sitting: { identifierCode: 100, hebrewName: 'יושב', englishName: 'Sitting', showStatus: ['30','40'] },
	  Ordered: { identifierCode: 101, hebrewName: 'מוזמן', englishName: 'Ordered', showStatus: ['10','20'] },
	  Occasional: { identifierCode: 200, hebrewName: 'מזדמן', englishName: 'Occasional', showStatus: ['50']}
	};
  };
 
  this.$get = function guestStatusFactory() {
    return new GuestStatusesProvider();
  };
});