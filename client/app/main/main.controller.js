'use strict';

angular.module('portfolioApp')
    .controller('MainController', function ($scope, workService, appSettings, $location, onepageUtil, Auth) {
        var vm = this;

        vm.appSettings = appSettings;
        vm.workItems = workService.query();
        vm.isAdmin = Auth.isAdmin;

        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';
        document.documentElement.style.height = '100%';

        vm.sectionsLoaded = function () {
            onepageUtil.setup();
        };
    });