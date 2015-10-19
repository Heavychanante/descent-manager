'use strict';

describe('Service: Item', function () {

  // load the service's module
  beforeEach(module('descentManagerApp'));

  // instantiate service
  var Item;
  beforeEach(inject(function (_Item_) {
    Item = _Item_;
  }));

  it('debe devolver todos los objetos', function () {
    var objetos = Item.list();
    expect(objetos).toBeDefined();
    expect(objetos.length).not.toEqual(0);
  });

  it('debe devolver los objetos asignables a un jugador', function () {
    var objetos = Item.getObjetosAsignables(1);
    expect(objetos).toBeDefined();
  });

  it('debe devolver los objetos asignables a un jugador paginadas', function () {
    var objetos = Item.getObjetosAsignablesPaginadas(1,1,5);
    expect(objetos).toBeDefined();
  });
});
