'use strict';

angular.module('portfolioApp')
    .controller('ExperienceController', function ($scope, $window, workService, Auth, appSettings, $routeParams, onepageUtil, $timeout) {
        var vm = this;
        vm.appSettings = appSettings;
        vm.isAdmin = Auth.isAdmin;
        vm.item = workService.get({
            id: $routeParams.id
        });
        onepageUtil.remove();

        vm.sectionsLoaded = function () {
            appear();
        };

        function appear() {
            /* Check the location of each desired element */
            var articles = angular.element(document.getElementsByClassName('appear-item'));
            angular.forEach(articles, function (i, index) {

                var bottom_of_object = i.offsetTop + (i.offsetHeight / 3);
                var bottom_of_window = $window.pageYOffset + $window.innerHeight + 100;

                /* If the object is partially visible in the window, fade it in */
                if (bottom_of_window > bottom_of_object || index === 0) {

                    $(i).animate({
                        'opacity': '1',
                        'top': '50'
                    }, 500);

                }

            });
        }

        $(window).scroll(function () {
            appear();
        });
    
        $timeout(function(){
            $scope.startFade = true;
        }, 2000);
    });