/* jshint unused: false */

'use strict';

angular.module('descentManagerApp')
  .controller('MainCtrl', function($scope, $http, $state) {
    $scope.logout = function() {
      $http.post('/logout')
        .then(function(response) {
          $state.go('login');
        }, function(response) {
          console.log('ERROR logout : ' + response.message);
        });
    };
  });
