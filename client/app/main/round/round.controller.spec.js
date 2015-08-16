'use strict';

describe('Controller: RoundCtrl', function () {

  // load the controller's module
  beforeEach(module('descentManagerApp'));

  var RoundCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RoundCtrl = $controller('RoundCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
