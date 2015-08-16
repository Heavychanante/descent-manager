'use strict';

angular.module('descentManagerApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main.round.players', {
        url: '/players',
        templateUrl: 'app/main/round/players/players.html',
        controller: 'PlayersCtrl'
      });
  });
