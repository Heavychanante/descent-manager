/* jshint unused: false */

'use strict';

angular.module('descentManagerApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap',
  'ui.grid',
  'ui.grid.autoResize',
  'ui.grid.resizeColumns',
  'ngAnimate',
  'angularSpinners',
  'dialogs.main',
  'pascalprecht.translate'
])
  .config(function($stateProvider, $urlRouterProvider, $locationProvider, dialogsProvider, $translateProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);

    // Configuración de los diálogos de confirmación
    dialogsProvider.useBackdrop('static');
		dialogsProvider.useEscClose(false);
		dialogsProvider.useCopy(false);
		dialogsProvider.setSize('sm');

		$translateProvider.translations('es-ES',{
			DIALOGS_ERROR: "Error",
			DIALOGS_ERROR_MSG: "Se ha producido un error desconocido.",
			DIALOGS_CLOSE: "Cerrar",
			DIALOGS_PLEASE_WAIT: "Espere por favor",
			DIALOGS_PLEASE_WAIT_ELIPS: "Espere por favor...",
			DIALOGS_PLEASE_WAIT_MSG: "Esperando en la operacion para completar.",
			DIALOGS_PERCENT_COMPLETE: "% Completado",
			DIALOGS_NOTIFICATION: "Notificacion",
			DIALOGS_NOTIFICATION_MSG: "Notificacion de aplicacion Desconocido.",
			DIALOGS_CONFIRMATION: "Confirmación",
			DIALOGS_CONFIRMATION_MSG: "Se requiere confirmación.",
			DIALOGS_OK: "Aceptar",
			DIALOGS_YES: "Sí",
			DIALOGS_NO: "No"
		});

    // Por defecto, indicamos como idioma 'es-ES'
		$translateProvider.preferredLanguage('es-ES');
    //$translate.use('es');
  })

  // Este método se ejecutará cada vez que cambie el estado de navegación
  // Comprobará si el usuario está logeado y si no es así redirigirá a la página de login
  .run(function($rootScope, $http, $state) {
    $rootScope.alertMessage = '';
    $rootScope.showAlertMessage = false;
    $rootScope.showLoader = false;

    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
      if (toState.url !== '/register' && toState.url !== '/login') {
        $http.get('/loggedin')
          .then(function(response){
            $rootScope.loginErrorMessage = null;

            // Usuario autenticado
            if (response.data !== '0') {
              $rootScope.currentUser = response.data;
            } else {
              // Ususario no autenticado
              $rootScope.loginErrorMessage = 'Debes hacer login';
              event.preventDefault();
              $state.go('login');
            }
          }, function(response){
            console.error(response.status);
          });
      }
    });
  });
