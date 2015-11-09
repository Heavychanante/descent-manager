'use strict';

angular.module('descentManagerApp')
  .factory('Class', ['$http', function ($http) {
    return {
      // Método que devuelve el listado completo de clases
      list: function () {
        return $http({
                  method: 'GET',
                  url: '/api/classes/'
              });
      },
      // Método que devuelve las clases asociadas a un arquetipo
      getClassesByArchetype: function (archetype_id) {
        return $http({
                  method: 'GET',
                  url: '/api/classes/archetype/' + archetype_id
              });
      }
    };
  }]);
