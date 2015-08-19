'use strict';

angular.module('descentManagerApp')
  .config(['$stateProvider', function($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/main',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      });
  }]);

  // Método que comprueba si el usuario está logeado
  var  checkLogin = function($q, $http, $state, $rootScope) {
    var deferred = $q.defer();

    $http.get("/loggedin")
      .then(function(response){
        $rootScope.loginErrorMessage = null;

        // User autenticado
        if (response.data !== '0') {
          $rootScope.currentUser = response.data;
          deferred.resolve();
        } else {
          // User no autenticado
          $rootScope.loginErrorMessage = "Debes hacer login";
          deferred.resolve();
          $state.go("login");
        }
      }, function(response){
        console.error(response.status);
      });

      return deferred.promise;
  }
