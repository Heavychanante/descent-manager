'use strict';

describe('Filter: positiveNumber', function () {

  // load the filter's module
  beforeEach(module('descentManagerApp'));

  // initialize a new instance of the filter before each test
  var positiveNumber;
  beforeEach(inject(function ($filter) {
    positiveNumber = $filter('positiveNumber');
  }));

  it('debe devolver el valor positivo del valor de entrada si este es negativo', function () {
    expect(positiveNumber(-1)).toEqual(1);
  });

  it('debe devolver el valor positivo del valor de entrada si este es positivo', function () {
    expect(positiveNumber(1)).toEqual(1);
  });

  it('debe devolver 0 si el valor de entrada es 0', function () {
    expect(positiveNumber(0)).toEqual(0);
  });
});
