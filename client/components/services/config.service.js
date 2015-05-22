'use strict';

angular.module('portfolioApp')
    .factory('configService', function ($resource) {
        return $resource('/api/config/:id', {
            id: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    });