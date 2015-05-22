'use strict';

angular.module('portfolioApp').directive('onepage', [].concat(function () {
    return {
        link: function (scope, elem, attrs, ctrl) {
            // unbind the events that the plugin use before applying the plugin
            // this events are related with the mousewheel and the keyboards button
            $(document).unbind('mousewheel DOMMouseScroll MozMousePixelScroll keydown');

            // unbind the swipe events
            elem.unbind();

            // configure your plugin
            elem.onepage_scroll({
                sectionContainer: "section",
                easing: "ease",
                animationTime: 1000,
                pagination: true,
                updateURL: false,
                beforeMove: function (index) {},
                afterMove: function (index) {},
                loop: false,
                keyboard: true,
                responsiveFallback: false,
                direction: "vertical"
            });

            // if you need to setup click
            angular.element(".scrollNext").unbind().click(function (e) {
                e.preventDefault();
                elem.moveDown();
            });
            angular.element(".scrollPrev").unbind().click(function (e) {
                e.preventDefault();
                elem.moveUp();
            });
        }
    };
}));