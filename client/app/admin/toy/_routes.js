'use strict';

angular.module('portfolioApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/admin/toy/:id', {
        templateUrl: 'app/admin/toy/toy.html',
        controller: 'ToyAdminController',
        controllerAs: 'vm'
      });
  });