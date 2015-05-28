'use strict';

angular.module('portfolioApp')
    .controller('MeController', function ($sce, configService, onepageUtil) {
        var vm = this;
        vm.me = configService.get(function(result){
            vm.about = $sce.trustAsHtml(result.about);        
        });
    
        
        onepageUtil.remove();
        
    });