'use strict';

angular.module('descentManagerApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main.games', {
        url: '/games',
        templateUrl: 'app/main/games/games.html',
        controller: 'GamesCtrl'
      });
  });
