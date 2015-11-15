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
  'pascalprecht.translate',
  'ngEmbed'
])
  .config(function($stateProvider, $urlRouterProvider, $locationProvider, dialogsProvider, $translateProvider) {
    $urlRouterProvider.otherwise('/');

    $locationProvider.html5Mode(true);

    // Configuración de los diálogos de confirmación
    dialogsProvider.useBackdrop('static');
		dialogsProvider.useEscClose(false);
		dialogsProvider.useCopy(false);
		dialogsProvider.setSize('sm');

    // Traducciones
		$translateProvider.translations('es', es);
    $translateProvider.translations('en', en);

    // Sanitize
    $translateProvider.useSanitizeValueStrategy('escape');

    // Por defecto, indicamos como idioma 'es-ES'
		$translateProvider.preferredLanguage('es');
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


// Translations

var es = {
  DIALOGS_ERROR: 'Error',
  DIALOGS_ERROR_MSG: 'Se ha producido un error desconocido.',
  DIALOGS_CLOSE: 'Cerrar',
  DIALOGS_PLEASE_WAIT: 'Espere por favor',
  DIALOGS_PLEASE_WAIT_ELIPS: 'Espere por favor...',
  DIALOGS_PLEASE_WAIT_MSG: 'Esperando en la operacion para completar.',
  DIALOGS_PERCENT_COMPLETE: '% Completado',
  DIALOGS_NOTIFICATION: 'Notificacion',
  DIALOGS_NOTIFICATION_MSG: 'Notificacion de aplicacion Desconocido.',
  DIALOGS_CONFIRMATION: 'Confirmación',
  DIALOGS_CONFIRMATION_MSG: 'Se requiere confirmación.',
  DIALOGS_OK: 'Aceptar',
  DIALOGS_YES: 'Sí',
  DIALOGS_NO: 'No',
  MAIN_SUBTITLE: 'La aplicación definitiva para gestionar tus partidas de Descent',
  HEADER_SIGN_IN: 'Iniciar sesión',
  HEADER_REGISTER: 'Registrarse',
  REGISTER: 'Registrarse',
  SIGN_IN: 'Acceder',
  USERNAME: 'Usuario',
  PASSWORD: 'Contraseña',
  RETYPE_PASSWORD: 'Reescribir contraseña',
  LOGGED_USER: 'Usuario autenticado',
  LOGOUT: 'Salir',
  TOGGLE_NAVIGATION: 'Alternar navegación',
  PLAYERS: 'Jugadores',
  INFO: 'Información',
  SAVE: 'Guardar',
  CANCEL: 'Cancelar',
  NAME: 'Nombre',
  CLASS: 'Clase',
  SPEED: 'Velocidad',
  LIFE: 'Vida',
  STAMINA: 'Aguante',
  DEFENSE: 'Defensa',
  STRENGTH: 'Fuerza',
  KNOWLEDGE: 'Conocimiento',
  WILLPOWER: 'Voluntad',
  PERCEPTION: 'Percepción',
  ABILITY: 'Capacidad',
  FEAT: 'Proeza',
  ATTRIBUTES: 'Atributos',
  TIREDNESS: 'Fatiga',
  STUNNED: 'Aturdido',
  ILL: 'Enfermo',
  POISONED: 'Envenenado',
  IMMOBILE: 'Inmóvil',
  GOLD: 'Oro',
  EXPERIENCE: 'Experiencia',
  SKILLS: 'Habilidades',
  PENALIZATION: 'Penalización',
  EXPERIENCE_COST: 'Coste de experiencia',
  QUANTITY: 'Cantidad',
  DESCRIPTION: 'Descripción',
  TYPE: 'Tipo',
  PRICE: 'Precio',
  HANDS: 'Número de manos',
  FROM_DISTANCE: 'A distancia',
  ITEMS: 'Objetos',
  ADD_SKILL: 'Añadir habilidad',
  DELETE_SKILL: 'Borrar habilidad',
  ADD_ITEM: 'Añadir objeto',
  DELETE_ITEM: 'Añadir objeto',
  NO_ITEMS_TO_ADD: 'No hay objetos asignables al jugador',
  NO_SKILLS_TO_ADD: 'No hay habilidades asignables al jugador',
  NEW_GAME: 'Nueva partida',
  GAME: 'Partida',
  ADD_PLAYER: 'Añadir jugador',
  ARCHETYPE: 'Arquetipo',
  CHARACTER: 'Personaje',
  MY_GAMES: 'Mis partidas',
  CREATION_TIME: 'Fecha de creación',
  LAST_MODIFICATION: 'Última modificación',
  GOT_TO_GAME: 'Ir a la partida',
  DELETE_GAME: 'Borrar partida'
};

var en = {
  MAIN_SUBTITLE: 'The ultimate online application to manage your Descent games',
  HEADER_SIGN_IN: 'Please sign in',
  HEADER_REGISTER: 'Please register',
  REGISTER: 'Register here',
  SIGN_IN: 'Sign in',
  USERNAME: 'Username',
  PASSWORD: 'Password',
  RETYPE_PASSWORD: 'Retype password',
  LOGGED_USER: 'Logged user',
  LOGOUT: 'Logout',
  TOGGLE_NAVIGATION: 'Toggle navigation',
  PLAYERS: 'Players',
  INFO: 'Information',
  SAVE: 'Save',
  CANCEL: 'Cancel',
  NAME: 'Name',
  CLASS: 'Class',
  SPEED: 'Speed',
  LIFE: 'Vida',
  STAMINA: 'Aguante',
  DEFENSE: 'Defense',
  STRENGTH: 'Strength',
  KNOWLEDGE: 'Knowledge',
  WILLPOWER: 'Willpower',
  PERCEPTION: 'Perception',
  ABILITY: 'Ability',
  FEAT: 'Feat',
  ATTRIBUTES: 'Attributes',
  TIREDNESS: 'Tiredness',
  STUNNED: 'Stunned',
  ILL: 'Ill',
  POISONED: 'Poisoned',
  IMMOBILE: 'Immobile',
  GOLD: 'Gold',
  EXPERIENCE: 'Experience',
  SKILLS: 'Skills',
  PENALIZATION: 'Penalization',
  EXPERIENCE_COST: 'Experience cost',
  QUANTITY: 'Quantity',
  DESCRIPTION: 'Description',
  TYPE: 'Type',
  PRICE: 'Price',
  HANDS: 'Hands',
  FROM_DISTANCE: 'From a distance',
  ITEMS: 'Items',
  ADD_SKILL: 'Add skill',
  DELETE_SKILL: 'Delete skill',
  ADD_ITEM: 'Add item',
  DELETE_ITEM: 'Delete item',
  NO_ITEMS_TO_ADD: 'There are no items to add',
  NO_SKILLS_TO_ADD: 'There are no skills to add',
  NEW_GAME: 'New game',
  GAME: 'Game',
  ADD_PLAYER: 'Add player',
  ARCHETYPE: 'Archetype',
  CHARACTER: 'Character',
  MY_GAMES: 'My games',
  CREATION_TIME: 'Creation time',
  LAST_MODIFICATION: 'Last modification',
  GOT_TO_GAME: 'Go to game',
  DELETE_GAME: 'Delete game'
};
