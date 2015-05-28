'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ConfigSchema = new Schema({
    name: String,
    about: String,
    contactEmailAddress: String,
    linkedInAddress: String,
    githubAddress: String
});

module.exports = mongoose.model('Config', ConfigSchema);