'use strict';

angular.module('descentManagerApp')
  .controller('NewGameCtrl', function ($scope, $modal, Alert, Game, $rootScope, $state) {
    $scope.newGame = {
      name: '',
      user: $rootScope.currentUser,
      players: []
    };

    // Método que añade un jugador a la partida
    $scope.addPlayer = function() {
      var modalInstance = $modal.open({
        animation: true,
        templateUrl: 'app/main/newGame/modal/addPlayerModal/addPlayerModal.html',
        controller: 'AddPlayerModalCtrl',
        size: 'lg',
        resolve: {
          players: function () {
            return $scope.newGame.players;
          }
        }
      });

      modalInstance.result.then(function (player) {
        $scope.newGame.players.push(player);
      }, function () {
        console.log('Modal dismissed at: ' + new Date());
      });
    };

    // Método que borra un jugador de una partida
    $scope.deletePlayer = function(index) {
      $scope.newGame.players.splice(index, 1);
    };

    // Método que guarda la partida
    $scope.save = function() {
      Alert.showLoader();
      Game.createGame($scope.newGame)
        .then(function(response) {
            Alert.hideLoader();
            Alert.showAlert('La partida se ha creado correctamente');
            $state.go('main.round', {id: response.data.id});
          }, function(error) {
            Alert.hideLoader();
            Alert.showAlert('Error inesperado creando la partida', 'error');
          });
    };

  });
