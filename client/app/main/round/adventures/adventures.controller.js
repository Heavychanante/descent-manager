'use strict';

angular.module('descentManagerApp')
  .controller('AdventuresCtrl', function ($scope, $stateParams, Adventure) {
    $scope.init = function() {
  		$scope.partida_id = $stateParams.game_id;
  		Adventure.getGameAdventures($scope.partida_id)
  			.then(function(response) {
  				$scope.aventurasPartida = response.data;
  			}, function(error) {
  				console.log('Error recuperando las aventuras de la partida: ' + error);
  			});
  		Adventure.list().then(function(response) {
  			$scope.aventuras = response.data;
  		}, function(error) {
  			console.log('Error la lista de aventuras: ' + error);
  		});
  	};

  	$scope.init();
  });
