'use strict';

describe('Filter: getCantidad', function () {

  // load the filter's module
  beforeEach(module('descentManagerApp'));

  // initialize a new instance of the filter before each test
  var getCantidad;
  beforeEach(inject(function ($filter) {
    getCantidad = $filter('getCantidad');
  }));

  it('debe devolver la cantidad correcta si el objeto de entrada es de tipo \'JugadorHabilidad\'', function () {
    var jugadorHabilidad = {cantidad: 1};
    var input = {JugadorHabilidad: jugadorHabilidad};
    expect(getCantidad(input)).toEqual(1);
  });

  it('debe devolver la cantidad correcta si el objeto de entrada es de tipo \'Jugador\'', function () {
    var jugadorHabilidad = {cantidad: 1};
    var jugador = {JugadorHabilidad: jugadorHabilidad};
    var input = {Jugadors: [jugador]};
    expect(getCantidad(input)).toEqual(1);
  });
});
