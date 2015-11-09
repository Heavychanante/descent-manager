'use strict';

angular.module('descentManagerApp')
  .controller('AddPlayerModalCtrl', function ($scope, $modalInstance, Class, Character, players) {

    $scope.alias        = '';
    $scope.personaje_id = 0;
    $scope.personaje    = null;
    $scope.clase_id     = 0;
    $scope.clase       = null;
    $scope.showClasses  = false;
    $scope.personajes   = [];

    // Método que carga los personajes elegibles
    // No se mostrarán los personajes ya elegidos en la partida
    Character.list().then(function(response) {
      var encontrado = false;
      var characters = response.data;
      for (var i=0; i < characters.length; i++) {
        for (var j=0; (j < players.length) && !encontrado; j++) {
          if (players[j].personaje_id == characters[i].id) {
            encontrado = true;
          }
        }
        if (!encontrado) {
          $scope.personajes.push(characters[i]);
        }
        encontrado = false;
      }
    }, function(response) {
      console.error('Error llamando a Character.list(): ' + response.data + ' (' + response.status + ')');
    });

    // Muestra las clases a mostrar en base al personaje seleccionado
    $scope.selectClasses = function(personaje_id) {
      // Se recupera el arquetipo del personaje
      var arquetipo_id = 0;
      for (var i=0; i < $scope.personajes.length; i++) {
        if ($scope.personajes[i].id == personaje_id) {
          arquetipo_id = $scope.personajes[i].arquetipo_id;
          $scope.personaje = $scope.personajes[i];
        }
      }

      // Se recuperan las clases
      Class.getClassesByArchetype(arquetipo_id)
        .then(function(response) {
          $scope.clases = response.data;
          $scope.showClasses = true;
        }, function(response) {
          console.error('Error llamando a Class.getClassesByArchetype(): ' + response.data + ' (' + response.status + ')');
        });
    };

    // Selecciona la clase
    $scope.selectClass = function(clase_id) {
      for (var i=0; i < $scope.clases.length; i++) {
        if ($scope.clases[i].id == clase_id) {
          $scope.clase = $scope.clases[i];
        }
      }
    };

    // Guarda los datos del jugador
    $scope.save = function () {
      var player = {
        alias: $scope.alias,
        personaje_id: $scope.personaje_id,
        personaje: $scope.personaje,
        clase_id: $scope.clase_id,
        clase: $scope.clase
      }
      $modalInstance.close(player);
    };

    // Cancela la creación del usuario
    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  });
