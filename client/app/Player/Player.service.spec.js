'use strict';

describe('Service: Player', function () {

  // load the service's module
  beforeEach(module('descentManagerApp'));

  // instantiate service
  var Player;
  beforeEach(inject(function (_Player_) {
    Player = _Player_;
  }));

  it('debe devolver la lista de todos los jugadores', function () {
    var jugadores = Player.list();
    expect(jugadores).toBeDefined();
  });

  it('debe devolver un jugador a partir de su ID', function () {
    var jugador = Player.findById(1);
    expect(jugador).toBeDefined();
  });

  it('debe añadir una habilidad a un jugador', function () {
    var habilidad = {};
    var jugador = Player.setSkill(1, habilidad);
    expect(jugador).toBeDefined();
  });

  it('debe añadir un objeto a un jugador', function () {
    var objeto = {};
    var jugador = Player.setItem(1, objeto);
    expect(jugador).toBeDefined();
  });

  it('debe actualizar un jugador', function () {
    var jugador = {
      id: 1
    };
    var result = Player.update(jugador);
    expect(result).toBeDefined();
  });

  it('debe eliminar un objeto a un jugador', function () {
    var result = Player.deleteItem(1, 1);
    expect(result).toBeDefined();
  });

  it('debe eliminar una habilidad a un jugador', function () {
    var result = Player.deleteSkill(1, 1);
    expect(result).toBeDefined();
  });
});
