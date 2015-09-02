'use strict';

describe('Controller: AddSkillModalCtrl', function () {

  // load the controller's module
  beforeEach(module('descentManagerApp'));

  var AddItemModalCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AddItemModalCtrl = $controller('AddSkillModalCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
