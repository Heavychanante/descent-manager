'use strict';

angular.module('descentManagerApp')
  .controller('LoginCtrl', ['$scope', '$state', '$http', '$rootScope', function ($scope, $state, $http, $rootScope) {
    $scope.login = function(credentials) {
      $http.post("/login", credentials)
        .then(function(response){
          // Se guarda el usuario en la sesión global y se redirige a "main"
          $rootScope.currentUser = response.data;
          $state.go("main");
        }, function(response){
          console.error(response.status);
        });
    };
  }]);
