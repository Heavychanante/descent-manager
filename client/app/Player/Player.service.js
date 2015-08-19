'use strict';

angular.module('descentManagerApp')
  .factory('Player', ['$http', function ($http) {
    return {
  		// Método que devuelve la lista de todos los jugadores en BD
  		list : function() {
  			return $http({
  				method: "GET",
  				url: '/api/players'
  			})
  		},
  		// Método que obtiene las habilidades de un jugador
  		getHabilidades: function(jugadorId) {
  			return $http({
  				method: "GET",
  				url: 'http://localhost:8080/DescentManager/jugadores/' + jugadorId + '/habilidades'
  			})
  		},
  		// Método que obtiene la cantidad de veces que puede usar un jugador una habilidad
  		getCantidadHabilidad: function(jugadorId, habilidadId) {
  			return $http({
  				method: "GET",
  				url: 'http://localhost:8080/DescentManager/jugadores/' + jugadorId + '/habilidades/' + habilidadId + '/cantidad'
  			})
  		},
  		// Método que obtiene los objetos de un jugador
  		getObjetos: function(jugadorId) {
  			return $http({
  				method: "GET",
  				url: 'http://localhost:8080/DescentManager/jugadores/' + jugadorId + '/objetos'
  			})
  		},
  		// Método que añade una habilidad a un jugador
  		setHabilidad: function (jugadorId, habilidad){
  			return $http({
  				method: "POST",
  				url: 'http://localhost:8080/DescentManager/jugadores/' + jugadorId + '/habilidades',
  				data: habilidad
  			})
  		},
  		// Método que añade un objeto a un jugador
  		setObjeto: function(jugadorId, objeto) {
  			return $http({
  				method: "POST",
  				url: 'http://localhost:8080/DescentManager/jugadores/' + jugadorId + '/objetos',
  				data: objeto
  			})
  		},
  		// Método que actualiza un jugador
  		update: function(jugador) {
  			return $http({
  				method: "POST",
  				url: 'http://localhost:8080/DescentManager/jugadores',
  				data: jugador
  			})
  		}
	}
}]);
