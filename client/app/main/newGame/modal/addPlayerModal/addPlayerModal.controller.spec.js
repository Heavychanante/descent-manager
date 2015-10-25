'use strict';

describe('Controller: AddPlayerModalCtrl', function () {

  // load the controller's module
  beforeEach(module('descentManagerApp'));

  var AddPlayerModalCtrl, scope, modalInstance;

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
    AddPlayerModalCtrl = $controller('AddPlayerModalCtrl', {
      $scope: scope,
      $modalInstance: modalInstance
    });
  }));

  it('debe cerrar la ventana modal', function () {
    scope.cancel();
    expect(modalInstance.dismiss).toHaveBeenCalled();
  });
});
