'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var WorkSchema = new Schema({
    name: String,
    info: String,
    style: String,
    link: String,
    date: String,
    order: Number,
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
        style: String,
        transformations: String,
        order: Number
        }]
});

module.exports = mongoose.model('Work', WorkSchema);