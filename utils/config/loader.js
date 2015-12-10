'use strict';

var path = require('path');

module.exports = {

    resolvePath: function(filePath) {
        var args = [].slice.call(arguments);
        filePath = Array.isArray(filePath) ? filePath : args;
        return path.join.apply(path, filePath);
    },

    require: function () {
        var args = [].slice.call(arguments);
        var file = this.resolvePath(args);
        var resolved;
        try {
            resolved = require(file);
        }catch(e) {
            resolved = undefined;
        }

        return resolved;
    },

    requireCwd: function() {
        var args = [].slice.call(arguments);
        args.unshift(process.cwd());
        return this.require.apply(this, args);
    }

};
