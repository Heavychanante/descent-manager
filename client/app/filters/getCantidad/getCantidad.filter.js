'use strict';
/**
 * Filtro que calcula la cantidad de veces de que dispone un jugador de una habilidad
 */
angular.module('descentManagerApp')
  .filter('getCantidad', function () {
    return function (input) {
      var cantidad;
      if (input.JugadorHabilidad) {
        cantidad = input.JugadorHabilidad.cantidad;
      } else {
        cantidad = input.Jugadors[0].JugadorHabilidad.cantidad;
      }
      return cantidad;
    };
  });
