/* jshint unused: false */

'use strict';

angular.module('descentManagerApp')
  .controller('RegisterCtrl', ['$scope', '$state', '$http', '$rootScope', function ($scope, $state, $http, $rootScope) {
    $scope.alert = false;
    $scope.alertClass = '';
    $scope.alertMessage = '';

    $scope.register = function(registration) {
      if (registration.username  && registration.name &&
          registration.password && registration.password2) {
            if (registration.password !== registration.password2) {
              $scope.alertClass = 'alert-danger';
              $scope.alertMessage = 'Los campos de contraseña no coinciden';
              $scope.alert = true;
            } else {
              $http.post('/register', registration)
                .then(function(response) {
                  // Se guarda el usuario en la sesión global y se redirige a "main"
                  $rootScope.currentUser = response.data;
                  $scope.alert = false;
                  $scope.alertClass = '';
                  $scope.alertMessage = '';
                  $state.go('main');
                }, function(response) {
                  $scope.alertClass = 'alert-danger';
                  $scope.alertMessage = 'El usuario introducido ya existe';
                  $scope.alert = true;
                });
            }
      }
    };

    $scope.login = function() {
      $state.go('login');
    };
  }]);
