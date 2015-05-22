'use strict';

angular.module('portfolioApp')
    .controller('MeController', function ($scope, configService, onepageUtil) {
        var vm = this;
        vm.me = configService.query();
        
        onepageUtil.remove();
        
    });