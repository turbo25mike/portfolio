/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Work = require('../api/work/work.model');
var Tool = require('../api/tool/tool.model');
var User = require('../api/user/user.model');
var Config = require('../api/config/config.model');

Config.find({}).remove(function () {
    Config.create({
        name: 'JEFFJOHNSON',
        about: 'A short little bio.',
        contactEmailAddress: 'test@test.com'
    });
});

Tool.find({}).remove(function () {
    Tool.create({
        name: 'Development Tools',
        order: 1,
        images: [{
            id: 'sample2',
            order: 2,
            format: 'jpg'
        }, {
            id: 'sample',
            order: 1,
            format: 'jpg'
        }]
    });
});

Work.find({}).remove(function () {
    Work.create({
        name: 'Development Tools',
        info: 'Integration with popular tools such as Bower, Grunt, Karma, Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, Stylus, Sass, CoffeeScript, and Less.',
        style: 'overflow:hidden; color:black',
        link: 'http://google.com',
        date: '2015',
        order: 1,
        image: {
            id: 'sample',
            format: 'jpg'
        },
        experienceItems: [{
            kind: 'image',
            id: 'sample',
            order: 1,
            format: 'jpg'
        }]
    }, {
        name: 'Server and Client integration',
        info: 'Built with a powerful and fun stack: MongoDB, Express, AngularJS, and Node.',
        style: 'overflow:hidden; background-color:Gainsboro; color: white;',
        link: 'http://google.com',
        date: '2015',
        order: 2,
        image: {
            id: 'sample',
            format: 'jpg'
        },
        experienceItems: [{
            kind: 'image',
            id: 'sample',
            order: 1,
            format: 'jpg'
        }, {
            kind: 'text',
            info: 'Well hello there!',
            order: 2
        }, {
            kind: 'image',
            id: 'sample',
            order: 3,
            format: 'jpg'
        }]
    });
});

User.find({}).remove(function () {
    User.create({
        provider: 'local',
        name: 'Test User',
        email: 'test@test.com',
        password: 'test'
    }, {
        provider: 'local',
        role: 'admin',
        name: 'Admin',
        email: 'admin@admin.com',
        password: 'admin'
    }, function () {
        console.log('finished populating users');
    });
});