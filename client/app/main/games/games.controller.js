'use strict';

angular.module('descentManagerApp')
  .controller('GamesCtrl', function ($scope, $rootScope, Game, Alert) {
    // Carga las partidas del usuario
    Game.getUserGames($rootScope.currentUser.id)
      .then(function(response) {
        $scope.partidas = response.data;
      }, function(error) {
        Alert.showAlert('Error inesperado recuperando las partidas del usuario', 'error');
      });

    $scope.goToGame = function(partida_id) {
      console.log(partida_id);
    }
  });
