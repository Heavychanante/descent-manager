'use strict';

angular.module('descentManagerApp')
  .controller('ActsCtrl', function ($scope, $stateParams) {
    $scope.init = function() {
  		$scope.partida_id = $stateParams.game_id;
  	};
  });
