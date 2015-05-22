'use strict';

angular.module('portfolioApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/me', {
        templateUrl: 'app/me/me.html',
        controller: 'MeController',
        controllerAs: 'vm'
      });
  });