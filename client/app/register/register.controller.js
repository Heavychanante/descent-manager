'use strict';

angular.module('descentManagerApp')
  .controller('RegisterCtrl', ['$scope', '$state', '$http', '$rootScope', function ($scope, $state, $http, $rootScope) {
    $scope.alert = false;
    $scope.alertClass = "";
    $scope.alertMessage = "";

    $scope.register = function(registration) {
      
    }

    $scope.login = function() {
      $state.go("login");
    }
  }]);
