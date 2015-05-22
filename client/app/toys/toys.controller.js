'use strict';

angular.module('portfolioApp')
    .controller('ToysController', function ($scope, toolService, onepageUtil, Auth) {
        var vm = this;
        vm.isAdmin = Auth.isAdmin;
        vm.toys = toolService.query();
        onepageUtil.remove();
    });