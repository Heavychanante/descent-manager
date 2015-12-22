'use strict';

describe('Controller: ActsCtrl', function () {

  // load the controller's module
  beforeEach(module('descentManagerApp'));

  var ActsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ActsCtrl = $controller('ActsCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
