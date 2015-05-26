'use strict';

angular.module('portfolioApp')
    .controller('ToysController', function ($scope, toolService, onepageUtil, Auth, appSettings) {
        var vm = this;
        vm.isAdmin = Auth.isAdmin;
        vm.appSettings = appSettings;
        vm.toys = toolService.query();
        onepageUtil.remove();
    });