'use strict';

angular.module('descentManagerApp')
  .controller('PlayersCtrl', ['$scope', '$modal', 'Player', 'uiGridConstants', '$q', function($scope, $modal, Player, uiGridConstants, $q) {
    $scope.init = function() {
  		$scope.selectedTab = 0;
  		Player.list().
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
        var promises = new Array();

        // Se actualiza el jugador con las nuevas habilidades
        for (var i=0; i < newSkills.length; i++) {
          var promise = Player.setSkill(jugador.id, newSkills[i]);
          promises.push(promise);
        }
        $q.all(promises).then(function(response){
          // Se recarga el jugador
          Player.findById(jugador.id).then(function(response){
            for (var i=0; i < $scope.jugadores.length; i++) {
              if ($scope.jugadores[i].id == jugador.id) {
                $scope.jugadores[i] = response.data[0];
              }
            }
          }, function(error){
            console.log('Error fetching player ' + jugador.id + ' info: ' + error.message);
          });
        }, function(error){
          console.log('Error saving new skills to player ' + jugador.id + ': ' + error.message);
        })
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
        var promises = new Array();

        // Se actualiza el jugador con los nuevos objetos
        for (var i=0; i < newItems.length; i++) {
          var promise = Player.setItem(jugador.id, newItems[i]);
          promises.push(promise);
        }
        $q.all(promises).then(function(response){
          // Se recarga el jugador
          Player.findById(jugador.id).then(function(response){
            for (var i=0; i < $scope.jugadores.length; i++) {
              if ($scope.jugadores[i].id == jugador.id) {
                $scope.jugadores[i] = response.data[0];
              }
            }
          }, function(error){
            console.log('Error fetching player ' + jugador.id + ' info: ' + error.message);
          });
        }, function(error){
          console.log('Error saving new items to player ' + jugador.id + ': ' + error.message);
        })
      }, function () {
        console.log('Modal dismissed at: ' + new Date());
      });
    };

    $scope.incLife = function(jugador) {
      jugador.vida++;
    }

    $scope.decLife = function(jugador) {
      jugador.vida--;
    }

    $scope.incStamina = function(jugador) {
      jugador.aguante++;
    }

    $scope.decStamina = function(jugador) {
      jugador.aguante--;
    }

  	// Se actualizan los campos del jugador
  	$scope.updateJugador = function (jugador) {
  		Player.update(jugador).
  			then(function(response) {
  				console.log('Jugador ' + jugador.Usuario.alias + ' actualizado: ' + response.status);
          $scope.init();
  			}, function(response) {
  				console.error('Error actualizando al jugador ' + jugador.Usuario.alias + ': ' + response.data + ' (' + response.status + ')');
  			});
  	};

    // Se inicializa la vista de jugadores
  	$scope.init();
  }]);
