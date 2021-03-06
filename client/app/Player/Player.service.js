'use strict';

angular.module('descentManagerApp')
  .factory('Player', ['$http', function ($http) {
    return {
  		// Método que devuelve la lista de todos los jugadores en BD
  		list : function() {
  			return $http({
  				method:'GET',
  				url: '/api/players'
  			});
  		},
      // Método que devuelve un jugador a partir de su ID
      findById : function(id) {
  			return $http({
  				method: 'GET',
  				url: '/api/players/' + id
  			});
  		},
      // Método que devuelve el listado de jugadores de una partida
  		getGamePlayers : function(game_id) {
  			return $http({
  				method:'GET',
  				url: '/api/players/game/' + game_id
  			});
  		},
      // Método que añade una habilidad a un jugador
  		setSkill: function (jugadorId, habilidad){
  			return $http({
  				method: 'POST',
  				url: '/api/players/' + jugadorId + '/skills',
  				data: habilidad
  			});
  		},
  		// Método que añade un objeto a un jugador
  		setItem: function(jugadorId, objeto) {
  			return $http({
  				method: 'POST',
  				url: '/api/players/' + jugadorId + '/items',
  				data: objeto
  			});
  		},
  		// Método que actualiza un jugador
  		update: function(jugador) {
  			return $http({
  				method: 'PUT',
  				url: '/api/players',
  				data: jugador
  			});
  		},
      // Método que elimina una habilidad a un jugador
      deleteSkill: function(jugadorId, habilidadId) {
        return $http({
          method: 'DELETE',
          url: '/api/players/' + jugadorId + '/skills/' + habilidadId,
        });
      },
      // Método que elimina un objeto a un jugador
      deleteItem: function(jugadorId, objetoId) {
        return $http({
          method: 'DELETE',
          url: '/api/players/' + jugadorId + '/items/' + objetoId,
        });
      }
	};
}]);
