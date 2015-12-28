'use strict';

angular.module('descentManagerApp')
  .controller('AdventuresCtrl', function ($scope, $stateParams, Adventure, Alert) {
    $scope.init = function() {
  		$scope.partida_id = $stateParams.game_id;
  		Adventure.getGameAdventures($scope.partida_id)
  			.then(function(response) {
  				$scope.aventurasPartida = response.data;

          Adventure.list().then(function(response) {
            $scope.aventuras = response.data;

            // Se construye el objeto con el árbol de aventuras
            $scope.arbol = [];
            for (var i=0; i < $scope.aventuras.length; i++) {
              var rama = {};

              if ($scope.aventuras[i].acto == 0) {
                rama.acto = 'Intro';
              } else if ($scope.aventuras[i].acto == 1) {
                rama.acto = 'Acto 1';
              } else if ($scope.aventuras[i].acto == 2) {
                rama.acto = 'Acto 2';
              } else if ($scope.aventuras[i].acto == 3) {
                rama.acto = 'Interludio 1';
              } else if ($scope.aventuras[i].acto == 4) {
                rama.acto = 'Interludio 2';
              } else if ($scope.aventuras[i].acto == 5) {
                rama.acto = 'Gran final 1';
              } else {
                rama.acto = 'Gran final 2';
              }

              rama.aventuras = [];
              var nuevaAventura = $scope.aventuras[i];
              nuevaAventura.ganada = null;
              nuevaAventura.activa = false;
              for (var j=0; j < $scope.aventurasPartida.length; j++) {
                if ($scope.aventurasPartida[j].aventura_id == $scope.aventuras[i].id) {
                  if ($scope.aventurasPartida[j].ganadores == 1) {
                    nuevaAventura.ganada = true;
                  } else if ($scope.aventurasPartida[j].ganadores == 0) {
                    nuevaAventura.ganada = false;
                  }
                  if ($scope.aventurasPartida[j].activa == 1) {
                    nuevaAventura.activa = true;
                  } else {
                    nuevaAventura.activa = false;
                  }
                }
              }
              rama.aventuras.push(nuevaAventura);

              if ($scope.aventuras[i].aventura_id != null) {
                i++;
                nuevaAventura = $scope.aventuras[i];
                nuevaAventura.ganada = null;
                nuevaAventura.activa = false;
                for (var k=0; k < $scope.aventurasPartida.length; k++) {
                  if ($scope.aventurasPartida[k].aventura_id == $scope.aventuras[i].id) {
                    if ($scope.aventurasPartida[k].ganadores == 1) {
                      nuevaAventura.ganada = true;
                    } else if ($scope.aventurasPartida[k].ganadores == 0) {
                      nuevaAventura.ganada = false;
                    }
                    if ($scope.aventurasPartida[k].activa == 1) {
                      nuevaAventura.activa = true;
                    } else {
                      nuevaAventura.activa = false;
                    }
                  }
                }
                rama.aventuras.push(nuevaAventura);
              }

              $scope.arbol.push(rama);
            }
          }, function(error) {
            console.log('Error la lista de aventuras: ' + error);
          });
  			}, function(error) {
  				console.log('Error recuperando las aventuras de la partida: ' + error);
  			});
  	};

    // Cambia el estado de las aventuras de la partida
    $scope.changeState = function(aventura) {
      if (aventura.activa == false && aventura.ganada == null) {
        aventura.activa = true;
        aventura.ganada = null;
      } else if (aventura.activa == true) {
        aventura.activa = false;
        aventura.ganada = true;
      } else if (aventura.ganada == true) {
        aventura.activa = false;
        aventura.ganada = false;
      } else if (aventura.ganada == false) {
        aventura.activa = false;
        aventura.ganada = null;
      }

      // Se actualiza en base de datos
      Alert.showLoader();
      Adventure.updateAdventures($scope.partida_id, aventura)
          .then(function(response) {
            Alert.hideLoader();
          }, function(error) {
            Alert.hideLoader();
            console.log('Error al actualizar las aventuras de la partida: ' + error);
          });
    };

  	$scope.init();
  });
