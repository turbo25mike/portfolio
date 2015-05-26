'use strict';

var express = require('express');
var controller = require('./cloudinary.controller');
var multiparty = require('connect-multiparty');
var multipartyMiddleware = multiparty();
var auth = require('../../auth/auth.service');

var router = express.Router();

router.post('/', multipartyMiddleware, auth.hasRole('admin'), controller.uploadImage);

module.exports = router;