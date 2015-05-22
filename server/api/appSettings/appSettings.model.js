'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var AppSettingsSchema = new Schema({
  cloudinaryName: String
});

module.exports = mongoose.model('AppSettings', AppSettingsSchema);