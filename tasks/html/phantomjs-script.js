'use strict';
var page = require('webpage').create();
var system = require('system');

page.open('http://127.0.0.1:8000' + system.args[1], function() {

    page.title = page.evaluate(function() {
        return document.title;
    });

    page.evaluate(function() {
        return document;
    });

    page.evaluate(function() {
        return document.body;
    });

    phantom.exit();
});