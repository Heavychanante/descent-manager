'use strict';

angular.module('descentManagerApp')
  .factory('Adventure', function ($http) {
    return {
      // Método que devuelve el listado completo de aventuras
      list: function () {
        return $http({
                  method: 'GET',
                  url: '/api/adventures/'
              });
      },
      getGameAdventures: function (gameId) {
        return $http({
                  method: 'GET',
                  url: '/api/adventures/game/' + gameId
              });
      }
    };
  });
