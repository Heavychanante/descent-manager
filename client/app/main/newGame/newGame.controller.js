'use strict';

angular.module('descentManagerApp')
  .controller('NewGameCtrl', function ($scope, $modal) {
    $scope.newGame = {
      name: '',
      players: []
    };

    $scope.addPlayer = function() {
      var modalInstance = $modal.open({
        animation: true,
        templateUrl: 'app/main/newGame/modal/addPlayerModal/addPlayerModal.html',
        controller: 'AddPlayerModalCtrl',
        size: 'lg'
      });

      modalInstance.result.then(function (player) {
        console.log(player);
      }, function () {
        console.log('Modal dismissed at: ' + new Date());
      });
    };

  });
