'use strict';

angular.module('descentManagerApp')
  .controller('NavbarCtrl', function ($scope, $translate) {
    $scope.toggleESEN = function() {
      $translate.use() === 'en'? $translate.use('es') : $translate.use('en');
    }
  });
