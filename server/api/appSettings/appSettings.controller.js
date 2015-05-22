'use strict';

var _ = require('lodash');
var config = require('../../config/environment');

// Get list of appSettingss
exports.index = function (req, res) {

    return res.json(200, {
        googleID: config.analytics.googleID,
        cloudinaryName: config.cloudinary.cloud_name
    });
};

function handleError(res, err) {
    return res.send(500, err);
}