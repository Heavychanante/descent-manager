'use strict';

angular.module('descentManagerApp')
  .factory('Game', function () {
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
