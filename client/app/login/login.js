'use strict';

angular.module('descentManagerApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('login', {
        url: '/',
        templateUrl: 'app/login/login.html',
        controller: 'LoginCtrl'
      });
  });
