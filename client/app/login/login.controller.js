'use strict';

angular.module('descentManagerApp')
  .controller('LoginCtrl', ['$scope', '$state', '$http', '$rootScope', function ($scope, $state, $http, $rootScope) {
    $scope.alert = false;
    $scope.alertClass = "";
    $scope.alertMessage = "";

    $scope.login = function(credentials) {
      if (credentials.username && credentials.password) {
        $http.post("/login", credentials)
          .then(function(response){
            // Se guarda el usuario en la sesión global y se redirige a "main"
            $rootScope.currentUser = response.data;
            $scope.alert = false;
            $scope.alertClass = "";
            $scope.alertMessage = "";
            $state.go("main");
          }, function(response){
            if (response.status == 401) {
              $scope.alertClass = "alert-danger";
              $scope.alertMessage = "Usuario o contraseña incorrectos";
              $scope.alert = true;
            } else {
              $scope.alertClass = "alert-danger";
              $scope.alertMessage = "Error inesperado. Contacte con el administrador";
              $scope.alert = true;
            }
          });
      }
    };

    $scope.register = function() {
      $state.go("register");
    }
  }]);
