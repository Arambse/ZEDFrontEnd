angular.module('ZedApp')
  .filter('shortTime', [function () {
  return function (input) {
    if (undefined != input) {
      var ar = input.split(':');
      return ar[0] + ":" + ar[1];
    }
    else {
      return input;
    }
  }
}]);
