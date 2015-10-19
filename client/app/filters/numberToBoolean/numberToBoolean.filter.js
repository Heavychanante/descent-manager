'use strict';

angular.module('descentManagerApp')
  .filter('numberToBoolean', function () {
    return function (input) {
      return input === 1? 'Sí' : 'No';
    };
  });
