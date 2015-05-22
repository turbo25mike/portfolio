'use strict';

angular.module('portfolioApp')
    .controller('ExperienceController', function ($scope, $window, workService, appSettings, $routeParams, onepageUtil) {
        var vm = this;
        vm.appSettings = appSettings;
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
            angular.forEach(articles, function (i) {

                var bottom_of_object = i.offsetTop + i.offsetHeight;
                var bottom_of_window = $window.pageYOffset + $window.innerHeight;

                /* If the object is completely visible in the window, fade it it */
                if (bottom_of_window > bottom_of_object) {

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