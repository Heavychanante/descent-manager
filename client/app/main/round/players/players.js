'use strict';

angular.module('descentManagerApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main.round.players', {
        url: '/players',
        params: {
           game_id: {
             value: ''
           }
        },
        templateUrl: 'app/main/round/players/players.html',
        controller: 'PlayersCtrl'
      });
  });
