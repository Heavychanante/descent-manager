'use strict';

describe('Controller: AddItemModalCtrl', function () {

  // load the controller's module
  beforeEach(module('descentManagerApp'));

  var AddItemModalCtrl;
  var scope;
  var modalInstance;
  var jugador;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
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
    AddItemModalCtrl = $controller('AddItemModalCtrl', {
      $scope: scope,
      $modalInstance: modalInstance,
      jugador: jugador
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
