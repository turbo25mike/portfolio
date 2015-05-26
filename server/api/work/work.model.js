'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var WorkSchema = new Schema({
    name: String,
    info: String,
    active: Boolean,
    style: String,
    link: String,
    date: String,
    image: {
        id: String,
        format: String,
        transformations: String
    },
    experienceItems: [{
        kind: String,
        id: String,
        info: String,
        format: String,
        transformations: String,
        order: Number
        }]
});

module.exports = mongoose.model('Work', WorkSchema);