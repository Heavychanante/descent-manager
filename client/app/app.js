'use strict';

angular.module('descentManagerApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap',
  'ui.grid',
  'ui.grid.autoResize',
  'ui.grid.resizeColumns'
])
  .config(function($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  })

  // Este método se ejecutará cada vez que cambie el estado de navegación
  // Comprobará si el usuario está logeado y si no es así redirigirá a la página de login
  .run(function($rootScope, $http, $state) {
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
      if (toState.url != "/register" && toState.url != "/login") {
        $http.get("/loggedin")
          .then(function(response){
            $rootScope.loginErrorMessage = null;

            // Usuario autenticado
            if (response.data !== '0') {
              $rootScope.currentUser = response.data;
            } else {
              // Ususario no autenticado
              $rootScope.loginErrorMessage = "Debes hacer login";
              event.preventDefault();
              $state.go("login");
            }
          }, function(response){
            console.error(response.status);
          });
      }
    })
  });
