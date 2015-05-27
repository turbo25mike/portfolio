'use strict';

angular.module('portfolioApp')
    .controller('ExperienceController', function ($scope, $window, workService, Auth, appSettings, $routeParams, onepageUtil) {
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
            var articles = angular.element('article')
            angular.forEach(articles, function (i, index) {

                var bottom_of_object = i.offsetTop + i.offsetHeight;
                var bottom_of_window = $window.pageYOffset + $window.innerHeight;

                /* If the object is completely visible in the window, fade it it */
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
    });