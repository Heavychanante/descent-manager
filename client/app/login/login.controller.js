'use strict';

angular.module('descentManagerApp')
  .controller('LoginCtrl', ['$scope', '$state', function ($scope, $state) {
    $scope.login = function() {
      $state.go('main');
    };
  }]);
