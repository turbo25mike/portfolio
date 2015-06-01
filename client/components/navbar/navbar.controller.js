'use strict';

angular.module('portfolioApp')
    .controller('NavbarCtrl', function ($location, Auth, configService) {
        var vm = this;
        vm.config = configService.get();
        vm.isCollapsed = true;
        vm.isLoggedIn = Auth.isLoggedIn;
        vm.isAdmin = Auth.isAdmin;
        vm.getCurrentUser = Auth.getCurrentUser;

        vm.logout = function () {
            Auth.logout();
            $location.path('/login');
        };

        $('.nav a').on('click', function () {
            $(".navbar-toggle").click()
        });

        vm.isActive = function (route) {
            return route === $location.path();
        };
    });