'use strict';

angular.module('descentManagerApp')
  .factory('Skill', ['$http', function ($http) {
    return {
  		// Método que obtiene las habilidades asignables a un jugador
  		getHabilidadesAsignables: function(jugadorId) {
  			return $http({
  				method: 'GET',
  				url: 'api/skills/player/' + jugadorId
  			});
  		},
  		// Método que obtiene listado paginado de habilidades asignables a un jugador
  		getHabilidadesAsignablesPaginadas: function(jugadorId, indice, cantidad) {
  			return $http({
  				method: 'GET',
  				url: 'api/skills/player/' + jugadorId + '/i/' + indice + '/n/' + cantidad
  			});
  		}
  	};
  }]);
