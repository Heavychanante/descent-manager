'use strict';

angular.module('descentManagerApp')
  .controller('AddPlayerModalCtrl', function ($scope, $modalInstance, Class, Character) {

    $scope.save = function () {
      //$modalInstance.close();
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  });
