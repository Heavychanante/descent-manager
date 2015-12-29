'use strict';

angular.module('descentManagerApp')
  .controller('RoundCtrl', function ($scope, $state, $stateParams) {
    // Recupera el identificador de la partida
    $scope.game_id = $stateParams.id;

    // Por defecto muestra la información de los jugadores
    $state.go('main.round.players', {game_id: $scope.game_id});

	// Clases de los enlaces
	$scope.initClasses = function() {
		$scope.playersClass = '';
 		$scope.actsClass = '';
	};

 	// Cambia la clase del enlace correspondiente
 	$scope.setActive = function(link) {
 		$scope.initClasses();
 		$scope[link + 'Class'] = 'active';
 	};

 	$scope.initClasses();
 	$scope.playersClass = 'active';
  });
