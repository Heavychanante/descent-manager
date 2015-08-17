'use strict';

angular.module('descentManagerApp')
  .factory('Skill', ['$http', function ($http) {
    return {
  		// Método que obtiene las habilidades asignables a un jugador
  		getHabilidadesAsignables: function(jugadorId) {
  			return $http({
  				method: "GET",
  				url: 'http://localhost:8080/DescentManager/habilidades/jugador/' + jugadorId
  			})
  		},
  		// Método que obtiene listado paginado de habilidades asignables a un jugador
  		getHabilidadesAsignablesPaginadas: function(jugadorId, indice, cantidad) {
  			return $http({
  				method: "GET",
  				url: 'http://localhost:8080/DescentManager/habilidades/jugador/' + jugadorId + '/i/' + indice + '/n/' + cantidad
  			})
  		}
  	}
  }]);
