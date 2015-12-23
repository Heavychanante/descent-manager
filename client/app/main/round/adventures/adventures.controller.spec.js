'use strict';

describe('Controller: AdventuresCtrl', function () {

  // load the controller's module
  beforeEach(module('descentManagerApp'));

  var AdventuresCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AdventuresCtrl = $controller('AdventuresCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
