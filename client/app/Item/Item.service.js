'use strict';

angular.module('descentManagerApp')
  .factory('Item', ['$http', function ($http) {
    return {
  		// Método que obtiene todos los objetos de la BD
  		list : function() {
  			return $http({
                  method: 'GET',
                  url: 'http://localhost:8080/DescentManager/objetos/'
              })
  		},
  		// Método que obtiene los objetos asignables a un jugador
  		getObjetosAsignables : function(jugadorId) {
  			return $http({
                  method: 'GET',
                  url: 'http://localhost:8080/DescentManager/objetos/jugador/' + jugadorId
              })
  		},
  		// Método que obtiene listado paginado de objetos asignables a un jugador
  		getObjetosAsignablesPaginadas: function(jugadorId, indice, cantidad) {
  			return $http({
  				method: "GET",
  				url: 'http://localhost:8080/DescentManager/objetos/jugador/' + jugadorId + '/i/' + indice + '/n/' + cantidad
  			})
  		}
  	}
  }]);
