'use strict';

angular.module('descentManagerApp')
  .controller('AddItemModalCtrl', function ($scope, $modalInstance, Item, uiGridConstants, jugador) {
    $scope.player = jugador;
    $scope.totalSize;
    $scope.currentPage;
    $scope.pageSize = 10;
    $scope.totalItems = [];
    $scope.currentItems = [];

    $scope.save = function () {
      var newItems = new Array();
      // Se guardan las nuevas habilidades del jugador
      for (var i=0; i < $scope.totalItems.length; i++) {
        if ($scope.totalItems[i].selected) {
          newItems.push($scope.totalItems[i]);
        }
      }
      $modalInstance.close(newItems);
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };

    $scope.pageChanged = function() {
      $scope.currentItems = $scope.totalItems.slice(($scope.currentPage - 1) * $scope.pageSize,
                                                    (($scope.currentPage - 1)*$scope.pageSize) + $scope.pageSize);
    };

    // Recupera los objetos asignables al jugador (todos)
    Item.list()
      .then(function(response){
        $scope.totalItems = response.data;
        $scope.totalSize = $scope.totalItems.length;
        for (var i=0; i < $scope.totalSize; i++) {
          $scope.totalItems[i].selected = false;
        }
        $scope.currentItems = $scope.totalItems.slice($scope.currentPage, $scope.pageSize);
        $scope.numPages = Math.ceil($scope.totalSize / $scope.pageSize);
        console.log($scope.totalSize);
        console.log($scope.numPages);
      }, function(error){
        console.log("ERROR getObjetosAsignables -> " + error);
      })
  });
