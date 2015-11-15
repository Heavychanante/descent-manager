'use strict';

angular.module('descentManagerApp')
  .factory('Game', function ($http) {
    return {
      // Método que crea una nueva partida
      createGame: function (partida) {
        return $http({
  				method: 'POST',
  				url: '/api/games/',
  				data: partida
  			});
      },
      // Método que devuelve las partidas creadas por un jugador
      getUserGames: function (usuarioId) {
        return $http({
  				method: 'GET',
  				url: '/api/games/user/' + usuarioId
  			});
      },
      // Método que elimina una partida
      deleteGame: function(partidaId) {
        return $http({
          method: 'DELETE',
          url: '/api/games/' + partidaId
        });
      }
    };
  });
