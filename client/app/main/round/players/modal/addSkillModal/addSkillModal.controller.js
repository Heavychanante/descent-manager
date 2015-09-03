'use strict';

angular.module('descentManagerApp')
  .controller('AddSkillModalCtrl', function ($scope, $modalInstance, Skill, uiGridConstants, jugador) {
    $scope.player = jugador;
    $scope.totalItems;
    $scope.currentPage;
    $scope.pageSize = 5;
    $scope.totalSkills = [];
    $scope.currentSkills = [];

    $scope.save = function () {
      var newSkills = new Array();
      // Se guardan las nuevas habilidades del jugador
      for (var i=0; i < $scope.totalSkills.length; i++) {
        if ($scope.totalSkills[i].selected) {
          newSkills.push($scope.totalSkills[i]);
        }
      }
      $modalInstance.close(newSkills);
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };

    $scope.pageChanged = function() {
      $scope.currentSkills = $scope.totalSkills.slice(($scope.currentPage - 1) * $scope.pageSize,
                                                      (($scope.currentPage - 1)*$scope.pageSize) + $scope.pageSize);
    };

    // Recupera las habilidades asignables al jugador
    Skill.getHabilidadesAsignables($scope.player.id)
      .then(function(response){
        $scope.totalSkills = response.data;
        $scope.totalItems = $scope.totalSkills.length;
        for (var i=0; i < $scope.totalItems; i++) {
          $scope.totalSkills[i].selected = false;
        }
        $scope.currentSkills = $scope.totalSkills.slice($scope.currentPage, $scope.pageSize);
        $scope.numPages = Math.ceil($scope.totalItems / $scope.pageSize);
      }, function(error){
        console.log("ERROR getHabilidadesAsignables -> " + error);
      })
  });
