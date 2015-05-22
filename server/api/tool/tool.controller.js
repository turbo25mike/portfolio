/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /tools              ->  index
 * POST    /tools              ->  create
 * GET     /tools/:id          ->  show
 * PUT     /tools/:id          ->  update
 * DELETE  /tools/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var tool = require('./tool.model');

// Get list of tools
exports.index = function (req, res) {
    tool.find().sort('images.order').exec(function (err, tools) {
    if (err) {
        return handleError(res, err);
    }
    return res.json(200, tools);
});
};

// Get a single tool
exports.show = function (req, res) {
    tool.findById(req.params.id, function (err, tool) {
        if (err) {
            return handleError(res, err);
        }
        if (!tool) {
            return res.send(404);
        }
        return res.json(tool);
    });
};

// Creates a new tool in the DB.
exports.create = function (req, res) {
    tool.create(req.body, function (err, tool) {
        if (err) {
            return handleError(res, err);
        }
        return res.json(201, tool);
    });
};

// Updates an existing tool in the DB.
exports.update = function (req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    tool.findById(req.params.id, function (err, tool) {
        if (err) {
            return handleError(res, err);
        }
        if (!tool) {
            return res.send(404);
        }
        var updated = _.merge(tool, req.body);
        updated.save(function (err) {
            if (err) {
                return handleError(res, err);
            }
            return res.json(200, tool);
        });
    });
};

// Deletes a tool from the DB.
exports.destroy = function (req, res) {
    tool.findById(req.params.id, function (err, tool) {
        if (err) {
            return handleError(res, err);
        }
        if (!tool) {
            return res.send(404);
        }
        tool.remove(function (err) {
            if (err) {
                return handleError(res, err);
            }
            return res.send(204);
        });
    });
};

function handleError(res, err) {
    return res.send(500, err);
}