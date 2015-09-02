'use strict';

describe('Filter: getCantidad', function () {

  // load the filter's module
  beforeEach(module('descentManagerApp'));

  // initialize a new instance of the filter before each test
  var getCantidad;
  beforeEach(inject(function ($filter) {
    getCantidad = $filter('getCantidad');
  }));

  it('should return the input prefixed with "getCantidad filter:"', function () {
    var text = 'angularjs';
    expect(getCantidad(text)).toBe('getCantidad filter: ' + text);
  });

});
