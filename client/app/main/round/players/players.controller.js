/* jshint unused: false */

'use strict';

angular.module('descentManagerApp')
  .controller('PlayersCtrl', ['$scope', '$modal', 'Player', 'uiGridConstants', '$q', 'Alert', 'dialogs', '$stateParams',
              function($scope, $modal, Player, uiGridConstants, $q, Alert, dialogs, $stateParams) {
    $scope.init = function() {
  		$scope.selectedTab = 0;
      $scope.partida_id = $stateParams.game_id;
      console.log('JUGADORES = ' + $scope.partida_id);
  		Player.getGamePlayers($scope.partida_id).
  			then(function(response) {
  				$scope.jugadores = response.data;
  			}, function(response) {
  				console.error('Error llamando a Player.list(): ' + response.data + ' (' + response.status + ')');
  			});
  	};

  	$scope.setSelected = function(index) {
  		$scope.selectedTab = index;
  	};

    $scope.openSkillModal = function(jugador) {
      var modalInstance = $modal.open({
        animation: true,
        templateUrl: 'app/main/round/players/modal/addSkillModal/addSkillModal.html',
        controller: 'AddSkillModalCtrl',
        size: 'lg',
        resolve: {
          jugador: function () {
            return jugador;
          }
        }
      });

      modalInstance.result.then(function (newSkills) {
        var promises = [];

        // Se actualiza el jugador con las nuevas habilidades
        for (var i=0; i < newSkills.length; i++) {
          var promise = Player.setSkill(jugador.id, newSkills[i]);
          promises.push(promise);
        }
        $q.all(promises).then(function(response){
          // Se recarga el jugador
          Player.findById(jugador.id).then(function(response){
            for (var i=0; i < $scope.jugadores.length; i++) {
              if ($scope.jugadores[i].id === jugador.id) {
                $scope.jugadores[i] = response.data[0];
              }
            }
          }, function(error){
            console.log('Error fetching player ' + jugador.id + ' info: ' + error.message);
          });
        }, function(error){
          console.log('Error saving new skills to player ' + jugador.id + ': ' + error.message);
        });
      }, function () {
        console.log('Modal dismissed at: ' + new Date());
      });

    };

    $scope.openItemModal = function(jugador) {
      var modalInstance = $modal.open({
        animation: true,
        templateUrl: 'app/main/round/players/modal/addItemModal/addItemModal.html',
        controller: 'AddItemModalCtrl',
        size: 'lg',
        resolve: {
          jugador: function () {
            return jugador;
          }
        }
      });

      modalInstance.result.then(function (newItems) {
        var promises = [];

        // Se actualiza el jugador con los nuevos objetos
        for (var i=0; i < newItems.length; i++) {
          var promise = Player.setItem(jugador.id, newItems[i]);
          promises.push(promise);
        }
        $q.all(promises).then(function(response){
          // Se recarga el jugador
          Player.findById(jugador.id).then(function(response){
            for (var i=0; i < $scope.jugadores.length; i++) {
              if ($scope.jugadores[i].id === jugador.id) {
                $scope.jugadores[i] = response.data[0];
              }
            }
          }, function(error){
            console.log('Error fetching player ' + jugador.id + ' info: ' + error.message);
          });
        }, function(error){
          console.log('Error saving new items to player ' + jugador.id + ': ' + error.message);
        });
      }, function () {
        console.log('Modal dismissed at: ' + new Date());
      });
    };

    $scope.incLife = function(jugador) {
      jugador.vida++;
    };

    $scope.decLife = function(jugador) {
      jugador.vida--;
    };

    $scope.incStamina = function(jugador) {
      jugador.aguante++;
    };

    $scope.decStamina = function(jugador) {
      jugador.aguante--;
    };

  	// Se actualizan los campos del jugador
  	$scope.updateJugador = function (jugador) {
      Alert.showLoader();
  		Player.update(jugador).
  			then(function(response) {
  				console.log('Jugador ' + jugador.alias + ' actualizado: ' + response.status);
          $scope.init();
          Alert.hideLoader();
          Alert.showAlert('El jugador se ha actualizado correctamente');
  			}, function(response) {
  				console.error('Error actualizando al jugador ' + jugador.alias + ': ' + response.data + ' (' + response.status + ')');
  			});
  	};

    // Método que elimina una habilidad de un jugador
    $scope.deleteHabilidad = function(jugador, index) {
      var habilidad = jugador.Habilidads[index];
      dialogs.confirm('Borrar habilidad', '¿Deseas borrar la habilidad "' + habilidad.nombre + '" del jugador "' + jugador.alias + '"?').
        result.then(function(){
          Alert.showLoader();
          Player.deleteSkill(jugador.id, habilidad.id).
            then(function(response){
              $scope.init();
              Alert.hideLoader();
              Alert.showAlert('La habilidad se ha eliminado correctamente');
            }, function(error){
              console.error('Error borrando la habilidad ' + habilidad.id + ': ' + error.data + ' (' + error.status + ')');
            });
        });
    };

    // Método que elimina un objeto de un jugador
    $scope.deleteObjeto = function(jugador, index) {
      var objeto = jugador.Objetos[index];
      dialogs.confirm('Borrar objeto', '¿Deseas borrar el objeto "' + objeto.nombre + '" del jugador "' + jugador.alias + '"?').
        result.then(function(){
          Alert.showLoader();
          Player.deleteItem(jugador.id, objeto.id).
            then(function(response){
              $scope.init();
              Alert.hideLoader();
              Alert.showAlert('El objeto se ha eliminado correctamente');
            }, function(error){
              console.error('Error borrando el objeto ' + objeto.id + ': ' + error.data + ' (' + error.status + ')');
            });
        });
    };

    // Se inicializa la vista de jugadores
  	$scope.init();
  }]);
