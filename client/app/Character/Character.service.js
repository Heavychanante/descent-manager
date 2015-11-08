'use strict';

angular.module('descentManagerApp')
  .factory('Character', function () {
    return {
      // Método que devuelve el listado completo de clases
      list: function () {
        return $http({
                  method: 'GET',
                  url: '/api/characters/'
              });
      }
    };
  });
