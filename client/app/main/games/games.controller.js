'use strict';

angular.module('descentManagerApp')
  .controller('GamesCtrl', function ($scope, $rootScope, Game, Alert, dialogs) {
    // Carga las partidas del usuario
    $scope.init = function() {
      Game.getUserGames($rootScope.currentUser.id)
        .then(function(response) {
          $scope.partidas = response.data;
        }, function(error) {
          Alert.showAlert('Error inesperado recuperando las partidas del usuario', 'error');
        });
    };

    // Borra una partida
    $scope.deleteGame = function(partida) {
      dialogs.confirm('Borrar partida', '¿Deseas borrar la partida "' + partida.nombre + '"?').
        result.then(function(){
          Alert.showLoader();
          Game.deleteGame(partida.id).
            then(function(response){
              $scope.init();
              Alert.hideLoader();
              Alert.showAlert('La partida se ha eliminado correctamente');
            }, function(error){
              var message = 'Error borrando la partida ' + partida.id + ': ' + error.data + ' (' + error.status + ')';
              Alert.hideLoader();
              Alert.showAlert(message, error);
            });
        });
    };

    $scope.init();
  });
