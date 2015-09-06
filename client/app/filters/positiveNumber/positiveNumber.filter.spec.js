'use strict';

describe('Filter: positiveNumber', function () {

  // load the filter's module
  beforeEach(module('descentManagerApp'));

  // initialize a new instance of the filter before each test
  var positiveNumber;
  beforeEach(inject(function ($filter) {
    positiveNumber = $filter('positiveNumber');
  }));

  it('should return the input prefixed with "positiveNumber filter:"', function () {
    var text = 'angularjs';
    expect(positiveNumber(text)).toBe('positiveNumber filter: ' + text);
  });

});
