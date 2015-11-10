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
      }
    };
  });
