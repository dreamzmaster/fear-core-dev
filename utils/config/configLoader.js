'use strict';
var each = require('lodash/collection/each');
var fs = require('fs');
var path = require('path');

module.exports = {

    load: function(filePath) {
        var module = void 0;
        try {
            module = require(filePath);
        }finally {
            return module;
        }
    },

    loadDir: function(dirPath) {
        var stat = fs.statSync(dirPath);
        var runtime = this;
        if(stat.isDirectory()) {
            var map = {};
            var files = fs.readdirSync(dirPath);
            each(files, function(file) {
                var parsed = path.parse(file);
                map[parsed.name] = runtime.load(file) || {};
            });
            return map;
        } else {
            return void 0;
        }
    }

};