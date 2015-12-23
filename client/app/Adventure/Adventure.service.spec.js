'use strict';

describe('Service: Adventure', function () {

  // load the service's module
  beforeEach(module('descentManagerApp'));

  // instantiate service
  var Adventure;
  beforeEach(inject(function (_Adventure_) {
    Adventure = _Adventure_;
  }));

  it('should do something', function () {
    expect(!!Adventure).toBe(true);
  });

});
