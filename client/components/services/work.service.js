'use strict';

angular.module('portfolioApp')
    .factory('workService', function ($resource) {
        return $resource('/api/work/:id', {
            id: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    });