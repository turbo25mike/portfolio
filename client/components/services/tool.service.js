'use strict';

angular.module('portfolioApp')
    .factory('toolService', function ($resource) {
        return $resource('/api/tools/:id', {
            id: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    });