'use strict';

angular.module('descentManagerApp')
  .controller('PlayersCtrl', ['$scope', 'Player', function($scope, Player) {

    $scope.init = function() {
  		$scope.selectedTab = 0;
  		Player.list().
  			then(function(response) {
  				$scope.jugadores = response.data;
          console.log($scope.jugadores);
  			}, function(response) {
  				console.error('Error llamando a Player.list(): ' + response.data + ' (' + response.status + ')');
  			});
  	};

  	$scope.setSelected = function(index) {
  		$scope.selectedTab = index;
  	};

  	$scope.getHabilidadesAndObjetos = function(jugador) {
  		Player.getHabilidades(jugador.id).
  			then(function(response) {
  				jugador.habilidadesJugador = response.data;
  			}, function(response) {
  				console.error('Error llamando a Player.getHabilidades(): ' + response.data + ' (' + response.status + ')');
  			});

  		Player.getObjetos(jugador.id).
  			then(function(response) {
  				jugador.objetosJugador = response.data;
  			}, function(response) {
  				console.error('Error llamando a Player.getObjetos(): ' + response.data + ' (' + response.status + ')');
  			});
  	};

  	$scope.getCantidadHabilidad = function(jugador, habilidad) {
  		Player.getCantidadHabilidad(jugador.id, habilidad.id).
  			then(function(response) {
  				habilidad.cantidad = response.data.cantidad;
  			}, function(response) {
  				console.error('Error llamando a Player.getCantidadHabilidad(): ' + response.data + ' (' + response.status + ')');
  			});
  	};

  	// Se inicializa la vista de jugadores
  	$scope.init();

  	// Actualiza las habilidades del jugador
  	$scope.refreshHabilidades = function (jugador) {
  		Player.getHabilidades(jugador.id).
  			then(function(response) {
  				jugador.habilidadesJugador = response.data;
  			}, function(response) {
  				console.error('Error llamando a Player.getHabilidades(): ' + response.data + ' (' + response.status + ')');
  			});
  	};

  	// Actualiza los objetos del jugador
  	$scope.refreshObjetos = function (jugador) {
  		Player.getObjetos(jugador.id).
  			then(function(response) {
  				jugador.objetosJugador = response.data;
  			}, function(response) {
  				console.error('Error llamando a Player.getObjetos(): ' + response.data + ' (' + response.status + ')');
  			});
  	};

  	// Se actualizan los campos del jugador
  	$scope.updateJugador = function (jugador) {
  		Player.save(jugador).
  			then(function(response) {
  				console.log('Jugador ' + jugador.usuario.alias + ' actualizado: ' + response.status);
  			}, function(response) {
  				console.error('Error actualizando al jugador ' + jugador.usuario.alias + ': ' + response.data + ' (' + response.status + ')');
  			});
  	};
  }]);
