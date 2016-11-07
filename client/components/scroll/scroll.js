'use strict';

angular.module('portfolioApp')
.directive('changeClassOnScroll', function ($window) {
  return {
    restrict: 'A',
    scope: {
        offset: "@",
        scrollClass: "@"
    },
    link: function(scope, element) {
        angular.element($window).bind("scroll", function() {
            if (this.pageYOffset >= parseInt(scope.offset)) {
                element.addClass(scope.scrollClass);
            } else {
                element.removeClass(scope.scrollClass);
            }
        });
    }
  };
})