'use strict';

describe('Filter: numberToBoolean', function () {

  // load the filter's module
  beforeEach(module('descentManagerApp'));

  // initialize a new instance of the filter before each test
  var numberToBoolean;
  beforeEach(inject(function ($filter) {
    numberToBoolean = $filter('numberToBoolean');
  }));

  it('debe devolver \'Sí\' si el valor de entrada es 1', function () {
    expect(numberToBoolean(1)).toEqual('Sí');
  });

  it('debe devolver \'No\' si el valor de entrada es 0', function () {
    expect(numberToBoolean(0)).toEqual('No');
  });

});
