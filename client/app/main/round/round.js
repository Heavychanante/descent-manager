'use strict';

angular.module('descentManagerApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main.round', {
        url: '/round/:id',
        templateUrl: 'app/main/round/round.html',
        controller: 'RoundCtrl'
      });
  });
