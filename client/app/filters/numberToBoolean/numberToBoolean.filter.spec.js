'use strict';

describe('Filter: numberToBoolean', function () {

  // load the filter's module
  beforeEach(module('descentManagerApp'));

  // initialize a new instance of the filter before each test
  var numberToBoolean;
  beforeEach(inject(function ($filter) {
    numberToBoolean = $filter('numberToBoolean');
  }));

  it('should return the input prefixed with "numberToBoolean filter:"', function () {
    var text = 'angularjs';
    expect(numberToBoolean(text)).toBe('numberToBoolean filter: ' + text);
  });

});
