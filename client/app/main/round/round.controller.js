'use strict';

angular.module('descentManagerApp')
  .controller('RoundCtrl', function ($scope, $state, $stateParams) {
    // Recupera el identificador de la partida
    $scope.game_id = $stateParams.id;
    console.log('PARTIDA = ' + $scope.game_id);

    // Por defecto muestra la información de los jugadores
    $state.go('main.round.players', {game_id: $scope.game_id});
  });
