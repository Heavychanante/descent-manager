'use strict';

describe('Controller: NewGameCtrl', function () {

  // load the controller's module
  beforeEach(module('descentManagerApp'));

  var NewGameCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NewGameCtrl = $controller('NewGameCtrl', {
      $scope: scope
    });
  }));

  it('debe inicializar una partida sin nombre', function () {
    expect(scope.newGame).toBeDefined()
    expect(scope.newGame.name).toBe('');
  });

  it('debe inicializar una partida sin jugadores', function () {
    expect(scope.newGame).toBeDefined()
    expect(scope.newGame.players.length).toBe(0);
  });

  it('debe añadir jugadores a la partida', function () {
    var previousLength = scope.newGame.players.length;
    scope.addPlayer();
    expect(scope.newGame.players.length).toBe(previousLength+1);
  });
});
