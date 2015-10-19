'use strict';

angular.module('descentManagerApp')
  .factory('Alert', function ($rootScope, $timeout) {
    return {
      showAlert: function(message) {
        $rootScope.alertMessage = message;
        $rootScope.showAlertMessage = true;
        $timeout(function () {
            $rootScope.alertMessage = '';
            $rootScope.showAlertMessage = false;
        }, 3000);
      },
      showLoader: function() {
        $rootScope.showLoader = true;
      },
      hideLoader: function() {
        $rootScope.showLoader = false;
      }
    };
  });
