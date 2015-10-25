'use strict';

angular.module('descentManagerApp')
  .controller('AddPlayerModalCtrl', function ($scope, $modalInstance) {
    $scope.message = 'Hello';

    $scope.save = function () {
      //$modalInstance.close();
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  });
