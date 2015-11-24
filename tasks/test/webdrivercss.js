'use strict';

var path = require('path');

module.exports = function(config) {
    var wdio = require('./webdriverio'),
        jsfy = require('jsfy'),
        wcss = path.join(__dirname, '../../', 'node_modules', 'webdrivercss');

    return function task() {
        var fileContents = '';

        config.__before = config.before;
        config.__webdrivercssPath = wcss;

        config.before = function() {
            this.__before && this.__before(require(this.__webdrivercssPath));
        };

        fileContents +=  'exports.config = ' + jsfy(config) + ';\n';

        return wdio({ file : fileContents })();
    };
};