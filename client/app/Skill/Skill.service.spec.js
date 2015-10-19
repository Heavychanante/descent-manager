'use strict';

describe('Service: Skill', function () {

  // load the service's module
  beforeEach(module('descentManagerApp'));

  // instantiate service
  var Skill;
  beforeEach(inject(function (_Skill_) {
    Skill = _Skill_;
  }));

  it('debe devolver las habilidades asignables a un jugador', function () {
    var habilidades = Skill.getHabilidadesAsignables(1);
    expect(habilidades).toBeDefined();
  });

  it('debe devolver las habilidades asignables a un jugador paginadas', function () {
    var habilidades = Skill.getHabilidadesAsignablesPaginadas(1,1,5);
    expect(habilidades).toBeDefined();
  });
});
