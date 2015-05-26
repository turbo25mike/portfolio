'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ToolSchema = new Schema({
    name: String,
    order: Number,
    images: [{ 
        id: String, 
        format: String,
        transformations: String,
        order: Number
    }]
});

module.exports = mongoose.model('Tool', ToolSchema);