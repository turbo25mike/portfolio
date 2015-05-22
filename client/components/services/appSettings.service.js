'use strict';

angular.module('portfolioApp')
    .provider('appSettings', function () {
        return {
            $get: function ($resource) {
                return $resource('/api/appSettings/:id').get();
            }
        };
    });