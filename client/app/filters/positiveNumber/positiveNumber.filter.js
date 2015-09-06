'use strict';

angular.module('descentManagerApp')
  .filter('positiveNumber', function () {
    return function (input) {
      var result = input;
      var type = typeof input;
      if (type != "number") {
        result = 0;
      } else {
        if (input < 0) {
          result = result * -1;
        }
      }
      return result;
    };
  });
