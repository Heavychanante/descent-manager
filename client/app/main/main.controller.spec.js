'use strict';

describe('Controller: MainCtrl', function() {

  // load the controller's module
  beforeEach(module('descentManagerApp'));
  beforeEach(module('stateMock'));

  var MainCtrl;
  var scope;
  var state;
  var $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function(_$httpBackend_, $controller, $rootScope, $state) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectPOST('/logout')
      .respond(['HTML5 Boilerplate', 'AngularJS', 'Karma', 'Express']);

    scope = $rootScope.$new();
    state = $state;
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  it('debe cerrar la sesión del usuario', function() {
    expect(state).toEqual('login');
  });
});
