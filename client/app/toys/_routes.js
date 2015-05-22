'use strict';

angular.module('portfolioApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/toys', {
        templateUrl: 'app/toys/toys.html',
        controller: 'ToysController',
        controllerAs: 'vm'
      });
  });