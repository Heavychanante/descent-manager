'use strict';

angular.module('descentManagerApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main.newGame', {
        url: '/newGame',
        templateUrl: 'app/main/newGame/newGame.html',
        controller: 'NewGameCtrl'
      });
  });
