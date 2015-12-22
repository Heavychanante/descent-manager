'use strict';

angular.module('descentManagerApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main.round.acts', {
        url: '/acts',
        params: {
           game_id: {
             value: ''
           }
        },
        templateUrl: 'app/main/round/acts/acts.html',
        controller: 'ActsCtrl'
      });
  });
