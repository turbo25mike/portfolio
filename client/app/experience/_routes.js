'use strict';

angular.module('portfolioApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/experience/:id', {
        templateUrl: 'app/experience/experience.html',
        controller: 'ExperienceController',
        controllerAs: 'vm'
      });
  });