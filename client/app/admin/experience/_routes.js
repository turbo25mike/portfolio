'use strict';

angular.module('portfolioApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/admin/experience/:id', {
        templateUrl: 'app/admin/experience/experience.html',
        controller: 'ExperienceAdminController',
        controllerAs: 'vm'
      });
  });