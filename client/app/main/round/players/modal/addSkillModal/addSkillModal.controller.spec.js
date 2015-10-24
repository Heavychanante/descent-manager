'use strict';

describe('Controller: AddSkillModalCtrl', function () {

  // load the controller's module
  beforeEach(module('descentManagerApp'));

  var AddSkillModalCtrl;
  var scope;
  var modalInstance;
  var jugador;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($rootScope, $controller) {
    scope = $rootScope.$new();
    /* jshint ignore:start */
    modalInstance = {                    // Create a mock object using spies
        close: jasmine.createSpy('modalInstance.close'),
        dismiss: jasmine.createSpy('modalInstance.dismiss'),
        result: {
          then: jasmine.createSpy('modalInstance.result.then')
        }
    };
    /* jshint ignore:end */
    jugador = {};
    AddSkillModalCtrl = $controller('AddSkillModalCtrl', {
      $scope: scope,
      $modalInstance: modalInstance,
      jugador: jugador
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
