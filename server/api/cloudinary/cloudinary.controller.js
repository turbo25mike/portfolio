'use strict';

var _ = require('lodash');
var config = require('../../config/environment');
var cloudinary = require('cloudinary');

cloudinary.config({
    cloud_name: config.cloudinary.cloud_name,
    api_key: config.cloudinary.api_key,
    api_secret: config.cloudinary.api_secret
});

exports.uploadImage = function(req, res){
    console.log(config.cloudinary.cloud_name + ':' + config.cloudinary.api_key + ':' + config.cloudinary.api_secret);
    console.log('file path: ' + req.files.file.path);
    cloudinary.uploader.upload(
      req.files.file.path,
    function (result) {
        console.log(result);
        return res.json(200, result);
    });
};

function handleError(res, err) {
    return res.send(500, err);
}