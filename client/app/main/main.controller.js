'use strict';

angular.module('portfolioApp')
    .controller('MainController', function ($scope, workService, appSettings, $location, onepageUtil) {
        var vm = this;

        vm.appSettings = appSettings;
        vm.workItems = workService.query();

        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';
        document.documentElement.style.height = '100%';

        vm.sectionsLoaded = function () {
            onepageUtil.setup();
        };

        vm.showExperience = function (item) {
            $location.path("/experience/" + item._id);
        };
    });