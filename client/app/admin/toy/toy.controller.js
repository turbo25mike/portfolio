'use strict';

angular.module('portfolioApp')
    .controller('ToyAdminController', function ($scope, toolService, onepageUtil, Auth) {
        var vm = this;
        vm.isAdmin = Auth.isAdmin;
        vm.toy = toolService.get({id : $routeParams.id});
        onepageUtil.remove();
    });